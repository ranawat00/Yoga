const Traffic = require('../../models/Traffic');

const disableCache = (res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
};

// @desc    Log a new page view visit
// @route   POST /api/traffic/log
// @access  Public
exports.logPageView = async (req, res) => {
  try {
    const { page, path, visitorId, device } = req.body;

    if (!page || !visitorId) {
      return res.status(400).json({ success: false, message: 'Page and VisitorId are required' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || '';

    const formattedPage = page.charAt(0).toUpperCase() + page.slice(1);

    const newVisit = await Traffic.create({
      page: formattedPage,
      path: path || '/',
      visitorId,
      device: device || 'Desktop',
      ip: clientIp,
      userAgent
    });

    res.status(201).json({ success: true, data: newVisit });
  } catch (error) {
    console.error('Error logging page view:', error.message);
    res.status(500).json({ success: false, message: 'Failed to log traffic', error: error.message });
  }
};

// @desc    Get website traffic statistics for Admin Dashboard
// @route   GET /api/traffic/stats
// @access  Public / Admin
exports.getTrafficStats = async (req, res) => {
  disableCache(res);
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const totalPageViews = await Traffic.countDocuments();
    const uniqueVisitorsAgg = await Traffic.distinct('visitorId');
    const uniqueVisitors = uniqueVisitorsAgg.length;

    const todayViews = await Traffic.countDocuments({ createdAt: { $gte: startOfToday } });
    const todayUniqueVisitorsAgg = await Traffic.distinct('visitorId', { createdAt: { $gte: startOfToday } });
    const todayVisitors = todayUniqueVisitorsAgg.length;

    const desktopViews = await Traffic.countDocuments({ device: 'Desktop' });
    const mobileViews = await Traffic.countDocuments({ device: 'Mobile' });
    const tabletViews = await Traffic.countDocuments({ device: 'Tablet' });
    const deviceTotal = Math.max(totalPageViews, 1);

    const deviceStats = {
      desktop: desktopViews,
      mobile: mobileViews,
      tablet: tabletViews,
      desktopPercent: Math.round((desktopViews / deviceTotal) * 100),
      mobilePercent: Math.round((mobileViews / deviceTotal) * 100),
      tabletPercent: Math.round((tabletViews / deviceTotal) * 100)
    };

    const topPagesAgg = await Traffic.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const topPages = topPagesAgg.map((p) => ({
      page: p._id || 'Home',
      count: p.count,
      percentage: Math.round((p.count / deviceTotal) * 100)
    }));

    const recentLogsRaw = await Traffic.find().sort({ createdAt: -1 }).limit(25);
    const recentLogs = recentLogsRaw.map((log) => ({
      id: log._id.toString(),
      page: log.page,
      path: log.path,
      device: log.device,
      visitorId: log.visitorId ? `ID-${log.visitorId.slice(-6).toUpperCase()}` : 'ANONYMOUS',
      ip: log.ip,
      date: log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Today',
      time: log.createdAt ? new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Just Now'
    }));

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalPageViews,
          uniqueVisitors,
          todayViews,
          todayVisitors
        },
        deviceStats,
        topPages,
        recentLogs
      }
    });
  } catch (error) {
    console.error('Error fetching traffic stats:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch traffic stats', error: error.message });
  }
};
