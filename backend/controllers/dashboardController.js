const Order = require('../models/Order');
const Registration = require('../models/Registration');
const User = require('../models/User');
const Traffic = require('../models/Traffic');

// Helper to disable caching so dev tools always report status 200 OK
const disableCache = (res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
};

// Helper to safely execute database queries
const safeDbCall = async (fn, fallback = []) => {
  try {
    return await fn();
  } catch (err) {
    console.warn('MongoDB query notice:', err.message);
    return fallback;
  }
};

// 1. GET /api/dashboard/overview (Custom Date Range Filter Support)
exports.getDashboardOverview = async (req, res) => {
  disableCache(res);
  try {
    const { timeRange, startDate, endDate } = req.query;

    let dateFilter = {};
    const now = new Date();

    if (timeRange === 'weekly') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: sevenDaysAgo, $lte: now } };
    } else if (timeRange === 'monthly') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = { createdAt: { $gte: startOfMonth, $lte: now } };
    } else if (timeRange === 'yearly') {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      dateFilter = { createdAt: { $gte: startOfYear, $lte: now } };
    } else if (timeRange === 'custom' && (startDate || endDate)) {
      const from = startDate ? new Date(startDate + 'T00:00:00') : new Date(0);
      const to = endDate ? new Date(endDate + 'T23:59:59') : now;
      dateFilter = { createdAt: { $gte: from, $lte: to } };
    }

    // Dynamic Revenue & Order Aggregations with Date Filter
    const revenueAgg = await safeDbCall(() => Order.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]), []);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    const totalOrders = await safeDbCall(() => Order.countDocuments(dateFilter), 0);
    const totalRegistrations = await safeDbCall(() => Registration.countDocuments(dateFilter), 0);
    const totalUsers = await safeDbCall(() => User.countDocuments(dateFilter), 0);
    const totalPageViews = await safeDbCall(() => Traffic.countDocuments(dateFilter), 0);
    const uniqueVisitorsAgg = await safeDbCall(() => Traffic.distinct('visitorId', dateFilter), []);
    const uniqueVisitors = uniqueVisitorsAgg.length;

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newUsersCount = await safeDbCall(() => User.countDocuments({ ...dateFilter, createdAt: { $gte: thirtyDaysAgo } }), 0);
    const existingUsersCount = Math.max(0, totalUsers - newUsersCount);

    // Dynamic Monthly Trends Aggregation
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);

    const monthlyRevenueOrders = await safeDbCall(() => Order.aggregate([
      { $match: Object.keys(dateFilter).length > 0 ? dateFilter : { createdAt: { $gte: startOfYear } } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      }
    ]), []);

    const monthlyRegs = await safeDbCall(() => Registration.aggregate([
      { $match: Object.keys(dateFilter).length > 0 ? dateFilter : { createdAt: { $gte: startOfYear } } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          registrations: { $sum: 1 }
        }
      }
    ]), []);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIdx = new Date().getMonth();

    const monthlyTrends = [];
    for (let i = 0; i <= currentMonthIdx; i++) {
      const monthNum = i + 1;
      const revOrd = monthlyRevenueOrders.find(m => m._id === monthNum) || { revenue: 0, orders: 0 };
      const reg = monthlyRegs.find(m => m._id === monthNum) || { registrations: 0 };

      monthlyTrends.push({
        month: monthNames[i],
        revenue: revOrd.revenue || 0,
        orders: revOrd.orders || 0,
        registrations: reg.registrations || 0
      });
    }

    // Dynamic Workshop Distribution Aggregation
    const workshopAgg = await safeDbCall(() => Registration.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$workshopTitle', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]), []);

    const colors = ['#5c8862', '#88a88e', '#3b5840', '#9bb8a1', '#d5e5d8'];
    const totalRegsCount = totalRegistrations > 0 ? totalRegistrations : 1;

    const workshopStats = workshopAgg.map((w, idx) => ({
      name: w._id || 'General Workshop',
      count: w.count,
      percentage: Math.round((w.count / totalRegsCount) * 100),
      color: colors[idx % colors.length]
    }));

    // Dynamic Live Event Feed from DB
    const recentOrders = await safeDbCall(() => Order.find(dateFilter).sort({ createdAt: -1 }).limit(5), []);
    const recentRegs = await safeDbCall(() => Registration.find(dateFilter).sort({ createdAt: -1 }).limit(5), []);
    const recentUsers = await safeDbCall(() => User.find(dateFilter).sort({ createdAt: -1 }).limit(5), []);

    let recentEvents = [];

    recentRegs.forEach((reg) => {
      recentEvents.push({
        id: `reg-${reg._id}`,
        type: 'registration',
        title: 'New Workshop Registration',
        detail: `${reg.name || 'User'} registered for ${reg.workshopTitle || 'Workshop'}`,
        time: reg.createdAt ? new Date(reg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        timestamp: reg.createdAt ? new Date(reg.createdAt).getTime() : 0,
        badge: 'Workshop'
      });
    });

    recentOrders.forEach((ord) => {
      recentEvents.push({
        id: `ord-${ord._id}`,
        type: 'order',
        title: 'New Order Received',
        detail: `Order placed for ₹${ord.total || 0} (${ord.paymentMethod || 'Online'})`,
        time: ord.createdAt ? new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        timestamp: ord.createdAt ? new Date(ord.createdAt).getTime() : 0,
        badge: 'Order'
      });
    });

    recentUsers.forEach((usr) => {
      recentEvents.push({
        id: `usr-${usr._id}`,
        type: 'user',
        title: 'New User Signed Up',
        detail: `${usr.name || usr.email || 'User'} created an account`,
        time: usr.createdAt ? new Date(usr.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        timestamp: usr.createdAt ? new Date(usr.createdAt).getTime() : 0,
        badge: 'User'
      });
    });

    recentEvents.sort((a, b) => b.timestamp - a.timestamp);
    recentEvents = recentEvents.slice(0, 8);

    const analyticsData = {
      summary: {
        totalRevenue,
        revenueGrowth: totalRevenue > 0 ? '+100%' : '0%',
        totalOrders,
        ordersGrowth: totalOrders > 0 ? '+100%' : '0%',
        totalRegistrations,
        registrationsGrowth: totalRegistrations > 0 ? '+100%' : '0%',
        totalUsers,
        newUsersCount,
        existingUsersCount,
        totalPageViews,
        uniqueVisitors
      },
      monthlyTrends,
      workshopStats,
      recentEvents
    };

    res.status(200).json({ success: true, data: analyticsData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// 2. GET /api/dashboard/orders (Dynamic Database Query)
exports.getDashboardOrders = async (req, res) => {
  disableCache(res);
  try {
    const orders = await safeDbCall(() => Order.find().sort({ createdAt: -1 }), []);

    const data = orders.map(ord => ({
      id: ord._id.toString().slice(-6).toUpperCase(),
      customer: ord.name || 'Customer',
      email: ord.email || 'N/A',
      items: ord.items ? ord.items.map(i => i.product?.title || 'Yoga Package').join(', ') : 'Yoga Package',
      total: ord.total || 0,
      payment: ord.paymentMethod || 'Online',
      status: ord.status || 'Completed',
      date: ord.createdAt ? new Date(ord.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
};

// 3. GET /api/dashboard/registrations (Dynamic Database Query)
exports.getDashboardRegistrations = async (req, res) => {
  disableCache(res);
  try {
    const registrations = await safeDbCall(() => Registration.find().sort({ createdAt: -1 }), []);

    const data = registrations.map((reg, index) => ({
      id: `REG-${100 + index}`,
      name: reg.name || 'Participant',
      phone: reg.phone || 'N/A',
      email: reg.email || 'N/A',
      workshop: reg.workshopTitle || '5-Day Online Yoga',
      batch: reg.batch || 'Morning Batch',
      couponCode: reg.couponCode || '',
      date: reg.createdAt ? new Date(reg.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: reg.status || 'REGISTERED'
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch registrations', error: error.message });
  }
};

// 4. GET /api/dashboard/users (Dynamic Database Query)
exports.getDashboardUsers = async (req, res) => {
  disableCache(res);
  try {
    const users = await safeDbCall(() => User.find().sort({ createdAt: -1 }), []);

    const data = users.map(usr => ({
      id: usr._id.toString().slice(-6).toUpperCase(),
      name: usr.name || 'User',
      email: usr.email || 'N/A',
      role: usr.role || 'user',
      dateJoined: usr.createdAt ? new Date(usr.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: 'Active'
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
};

// 5. GET /api/dashboard/workshops (Dynamic Aggregation from Registrations)
exports.getDashboardWorkshops = async (req, res) => {
  disableCache(res);
  try {
    const workshopAgg = await safeDbCall(() => Registration.aggregate([
      { $group: { _id: '$workshopTitle', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]), []);

    const data = workshopAgg.map((w, idx) => ({
      id: idx + 1,
      title: w._id || 'Yoga Workshop',
      registrationsCount: w.count,
      status: 'Active',
      category: 'Health & Wellness'
    }));

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch workshops', error: error.message });
  }
};
