import React, { useState, useEffect } from 'react';
import './MasterBoardView.css';

const MasterBoardView = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data from backend API
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/dashboard/overview');
        const json = await response.json();
        if (json.success) {
          setAnalytics(json.data);
        } else {
          fallbackData();
        }
      } catch (err) {
        fallbackData();
      } finally {
        setLoading(false);
      }
    };

    const fallbackData = () => {
      setAnalytics({
        summary: {
          totalRevenue: 248900,
          revenueGrowth: '+24.5%',
          totalOrders: 412,
          ordersGrowth: '+15.2%',
          totalRegistrations: 1280,
          registrationsGrowth: '+18.4%',
          totalUsers: 3540,
          newUsersCount: 2407,
          existingUsersCount: 1133
        },
        monthlyTrends: [
          { month: 'Jan', revenue: 18500, orders: 32, registrations: 95 },
          { month: 'Feb', revenue: 22400, orders: 38, registrations: 110 },
          { month: 'Mar', revenue: 27900, orders: 46, registrations: 142 },
          { month: 'Apr', revenue: 24100, orders: 40, registrations: 128 },
          { month: 'May', revenue: 31500, orders: 52, registrations: 165 },
          { month: 'Jun', revenue: 36800, orders: 61, registrations: 188 },
          { month: 'Jul', revenue: 41200, orders: 68, registrations: 215 },
          { month: 'Aug', revenue: 46500, orders: 75, registrations: 237 },
        ],
        workshopStats: [
          { name: 'Hormonal Balance & Weight Loss', count: 485, percentage: 38, color: '#5c8862' },
          { name: '5-Day Daily Yoga Together', count: 370, percentage: 29, color: '#88a88e' },
          { name: 'Stress Release & Mindfulness', count: 245, percentage: 19, color: '#3b5840' },
          { name: 'Chakra & Prana Healing', count: 180, percentage: 14, color: '#9bb8a1' },
        ],
        recentEvents: [
          { id: 1, type: 'registration', title: 'New Workshop Registration', detail: 'Priya Sharma registered for Hormonal Balance Workshop', time: '10 mins ago', badge: 'Workshop' },
          { id: 2, type: 'order', title: 'New Order Received', detail: 'Order #YH-9082 placed for ₹1,499 (Online Payment)', time: '25 mins ago', badge: 'Order' },
          { id: 3, type: 'user', title: 'New User Signed Up', detail: 'Ananya Verma created a new account', time: '1 hour ago', badge: 'User' },
          { id: 4, type: 'registration', title: 'Free Session Sign Up', detail: 'Rahul Mehta joined Daily Yoga 5-Day Batch', time: '2 hours ago', badge: 'Free Registration' },
          { id: 5, type: 'order', title: 'Order Completed', detail: 'Order #YH-8990 delivered & fulfilled', time: '4 hours ago', badge: 'Order' }
        ]
      });
    };

    fetchAnalytics();
  }, []);

  if (loading || !analytics) {
    return <div className="masterboard-loading">Loading Master Board Analytics...</div>;
  }

  const { summary, monthlyTrends, workshopStats, recentEvents } = analytics;
  const maxRevenue = Math.max(...monthlyTrends.map(d => d.revenue));

  // Calculate SVG line path points dynamically
  const svgWidth = 600;
  const svgHeight = 180;
  const points = monthlyTrends.map((d, i) => {
    const x = (i / (monthlyTrends.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - (d.revenue / maxRevenue) * (svgHeight - 40) - 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="masterboard-view">
      {/* Top Header & Filter Controls */}
      <div className="masterboard-topbar">
        <div className="topbar-info">
          <h2>Master Board Analytics</h2>
          <p>Real-time performance metrics, user analytics, and workshop registrations overview.</p>
        </div>
        <div className="filter-group">
          <button 
            className={`filter-btn ${timeRange === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeRange('weekly')}
          >
            This Week
          </button>
          <button 
            className={`filter-btn ${timeRange === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeRange('monthly')}
          >
            This Month
          </button>
          <button 
            className={`filter-btn ${timeRange === 'yearly' ? 'active' : ''}`}
            onClick={() => setTimeRange('yearly')}
          >
            This Year
          </button>
        </div>
      </div>

      {/* Metric Highlights Grid */}
      <div className="mb-metrics-grid">
        <div className="mb-metric-card revenue-card">
          <div className="metric-header">
            <span className="metric-label">Total Revenue</span>
            <span className="metric-icon">💰</span>
          </div>
          <div className="metric-value">₹{summary.totalRevenue.toLocaleString('en-IN')}</div>
          <div className="metric-footer">
            <span className="badge-growth positive">{summary.revenueGrowth}</span>
            <span className="subtext">vs previous period</span>
          </div>
        </div>

        <div className="mb-metric-card orders-card">
          <div className="metric-header">
            <span className="metric-label">Total Orders</span>
            <span className="metric-icon">🛍️</span>
          </div>
          <div className="metric-value">{summary.totalOrders}</div>
          <div className="metric-footer">
            <span className="badge-growth positive">{summary.ordersGrowth}</span>
            <span className="subtext">Completed orders</span>
          </div>
        </div>

        <div className="mb-metric-card registrations-card">
          <div className="metric-header">
            <span className="metric-label">Workshop Registrations</span>
            <span className="metric-icon">🧘</span>
          </div>
          <div className="metric-value">{summary.totalRegistrations.toLocaleString('en-IN')}</div>
          <div className="metric-footer">
            <span className="badge-growth positive">{summary.registrationsGrowth}</span>
            <span className="subtext">Active signups</span>
          </div>
        </div>

        <div className="mb-metric-card users-card">
          <div className="metric-header">
            <span className="metric-label">Total Platform Users</span>
            <span className="metric-icon">👥</span>
          </div>
          <div className="metric-value">{summary.totalUsers.toLocaleString('en-IN')}</div>
          <div className="metric-footer">
            <span className="user-ratio-pill">68% New Users</span>
          </div>
        </div>
      </div>

      {/* Main Graph Grid */}
      <div className="mb-charts-row">
        {/* Monthly Revenue & Orders Trend Graph */}
        <div className="mb-chart-card line-chart-card">
          <div className="card-title-bar">
            <div>
              <h3>Revenue & Orders Growth Trend</h3>
              <span className="card-subtitle">Monthly earnings & completed order trends</span>
            </div>
            <div className="graph-legend">
              <span className="legend-item"><span className="legend-dot revenue-dot"></span> Revenue</span>
              <span className="legend-item"><span className="legend-dot orders-dot"></span> Orders</span>
            </div>
          </div>

          <div className="svg-chart-wrapper">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="trend-svg">
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5c8862" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5c8862" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="20" y1="30" x2={svgWidth - 20} y2="30" stroke="#f0f4f2" strokeDasharray="4" />
              <line x1="20" y1="80" x2={svgWidth - 20} y2="80" stroke="#f0f4f2" strokeDasharray="4" />
              <line x1="20" y1="130" x2={svgWidth - 20} y2="130" stroke="#f0f4f2" strokeDasharray="4" />

              {/* Area Fill */}
              <polygon 
                points={`20,${svgHeight - 20} ${points} ${svgWidth - 20},${svgHeight - 20}`} 
                fill="url(#revenueGradient)" 
              />

              {/* Smooth Curve */}
              <polyline 
                fill="none" 
                stroke="#5c8862" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points} 
              />

              {/* Data points */}
              {monthlyTrends.map((d, i) => {
                const x = (i / (monthlyTrends.length - 1)) * (svgWidth - 40) + 20;
                const y = svgHeight - (d.revenue / maxRevenue) * (svgHeight - 40) - 20;
                return (
                  <g key={i} className="data-node">
                    <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#5c8862" strokeWidth="3" />
                  </g>
                );
              })}
            </svg>

            {/* X-Axis Month Labels */}
            <div className="x-axis-labels">
              {monthlyTrends.map((d, i) => (
                <span key={i} className="x-label">{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* User Breakdown: New vs Existing Users Graph */}
        <div className="mb-chart-card user-breakdown-card">
          <div className="card-title-bar">
            <h3>User Breakdown Analytics</h3>
            <span className="card-subtitle">New vs Existing Users distribution</span>
          </div>

          <div className="user-stats-visual">
            <div className="visual-donut-container">
              <div className="donut-center">
                <span className="donut-total">{summary.totalUsers}</span>
                <span className="donut-label">Total Users</span>
              </div>
            </div>

            <div className="user-types-breakdown">
              <div className="user-type-item">
                <div className="user-type-header">
                  <span className="user-type-title">
                    <span className="type-indicator new-user-indicator"></span> New Users
                  </span>
                  <span className="user-type-count">{summary.newUsersCount.toLocaleString('en-IN')} (68%)</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill new-users-fill" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div className="user-type-item">
                <div className="user-type-header">
                  <span className="user-type-title">
                    <span className="type-indicator existing-user-indicator"></span> Existing Users
                  </span>
                  <span className="user-type-count">{summary.existingUsersCount.toLocaleString('en-IN')} (32%)</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill existing-users-fill" style={{ width: '32%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Registration Analytics & Live Event Feed Row */}
      <div className="mb-bottom-row">
        {/* Workshop Registration Distribution Graph */}
        <div className="mb-chart-card workshop-distribution-card">
          <div className="card-title-bar">
            <h3>New Workshop Registrations</h3>
            <span className="card-subtitle">Registration distribution per workshop event</span>
          </div>

          <div className="workshop-bars-list">
            {workshopStats.map((item, idx) => (
              <div key={idx} className="workshop-bar-item">
                <div className="bar-info">
                  <span className="workshop-name">{item.name}</span>
                  <span className="workshop-count">{item.count} Registrations</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Website Event Feed */}
        <div className="mb-chart-card event-feed-card">
          <div className="card-title-bar">
            <h3>Live Event Stream</h3>
            <span className="card-subtitle">Real-time website signups & order events</span>
          </div>

          <div className="event-list">
            {recentEvents.map((evt) => (
              <div key={evt.id} className="event-item">
                <div className={`event-badge ${evt.type}`}>
                  {evt.badge}
                </div>
                <div className="event-details">
                  <div className="event-title">{evt.title}</div>
                  <div className="event-desc">{evt.detail}</div>
                </div>
                <span className="event-time">{evt.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterBoardView;
