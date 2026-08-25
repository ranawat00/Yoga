import React, { useState, useEffect } from 'react';
import './MasterBoardView.css';

const MasterBoardView = () => {
  const [timeRange, setTimeRange] = useState('monthly'); // 'weekly', 'monthly', 'yearly', 'custom'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async (customStart = startDate, customEnd = endDate, range = timeRange) => {
    try {
      setLoading(true);
      let url = `/api/dashboard/overview?timeRange=${range}`;
      if (range === 'custom') {
        if (customStart) url += `&startDate=${customStart}`;
        if (customEnd) url += `&endDate=${customEnd}`;
      }
      const response = await fetch(url);
      const json = await response.json();
      if (json.success) {
        setAnalytics(json.data);
        setError(null);
      } else {
        setError(json.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Network error: Unable to load live master board analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeRange !== 'custom') {
      fetchAnalytics(startDate, endDate, timeRange);
    }
  }, [timeRange]);

  const handleCustomSearch = (e) => {
    e.preventDefault();
    if (!startDate && !endDate) return;
    fetchAnalytics(startDate, endDate, 'custom');
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    if (range !== 'custom') {
      setStartDate('');
      setEndDate('');
    }
  };

  if (loading && !analytics) {
    return <div className="masterboard-loading">Loading Live Master Board Analytics...</div>;
  }

  if (error && !analytics) {
    return (
      <div className="masterboard-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry Connection
        </button>
      </div>
    );
  }

  const summary = analytics?.summary || {
    totalRevenue: 0,
    revenueGrowth: '0%',
    totalOrders: 0,
    ordersGrowth: '0%',
    totalRegistrations: 0,
    registrationsGrowth: '0%',
    totalUsers: 0,
    newUsersCount: 0,
    existingUsersCount: 0
  };

  const monthlyTrends = analytics?.monthlyTrends || [];
  const workshopStats = analytics?.workshopStats || [];
  const recentEvents = analytics?.recentEvents || [];

  const maxRevenue = Math.max(...monthlyTrends.map(d => d.revenue), 1);

  // Calculate SVG line path points dynamically
  const svgWidth = 600;
  const svgHeight = 180;
  const points = monthlyTrends.length > 0
    ? monthlyTrends.map((d, i) => {
        const x = (i / Math.max(monthlyTrends.length - 1, 1)) * (svgWidth - 40) + 20;
        const y = svgHeight - (d.revenue / maxRevenue) * (svgHeight - 40) - 20;
        return `${x},${y}`;
      }).join(' ')
    : `20,${svgHeight - 20} ${svgWidth - 20},${svgHeight - 20}`;

  return (
    <div className="masterboard-view">
      {/* Top Header & Filter Controls */}
      <div className="masterboard-topbar">
        <div className="topbar-info">
          <h2>Master Board Analytics</h2>
          <p>Real-time database metrics, live workshop registrations, and user activity.</p>
        </div>

        <div className="topbar-filter-section">
          <div className="filter-group">
            <button 
              className={`filter-btn ${timeRange === 'weekly' ? 'active' : ''}`}
              onClick={() => handleTimeRangeChange('weekly')}
            >
              This Week
            </button>
            <button 
              className={`filter-btn ${timeRange === 'monthly' ? 'active' : ''}`}
              onClick={() => handleTimeRangeChange('monthly')}
            >
              This Month
            </button>
            <button 
              className={`filter-btn ${timeRange === 'yearly' ? 'active' : ''}`}
              onClick={() => handleTimeRangeChange('yearly')}
            >
              This Year
            </button>
            <button 
              className={`filter-btn ${timeRange === 'custom' ? 'active' : ''}`}
              onClick={() => handleTimeRangeChange('custom')}
            >
              📅 Custom Range
            </button>
          </div>

          {/* Custom Date Range Calendar Picker */}
          {timeRange === 'custom' && (
            <form className="custom-date-range-container" onSubmit={handleCustomSearch}>
              <div className="date-input-group">
                <label>From:</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  required
                />
              </div>
              <div className="date-input-group">
                <label>To:</label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  required
                />
              </div>
              <button type="submit" className="apply-date-btn">
                🔍 Filter Analytics
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Metric Highlights Grid */}
      <div className="mb-metrics-grid">
        <div className="mb-metric-card revenue-card">
          <div className="metric-header">
            <span className="metric-label">Total Revenue</span>
            <span className="metric-icon">💰</span>
          </div>
          <div className="metric-value">₹{(summary.totalRevenue || 0).toLocaleString('en-IN')}</div>
          <div className="metric-footer">
            <span className="badge-growth positive">{summary.revenueGrowth}</span>
            <span className="subtext">Live earnings</span>
          </div>
        </div>

        <div className="mb-metric-card orders-card">
          <div className="metric-header">
            <span className="metric-label">Total Orders</span>
            <span className="metric-icon">🛍️</span>
          </div>
          <div className="metric-value">{summary.totalOrders || 0}</div>
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
          <div className="metric-value">{(summary.totalRegistrations || 0).toLocaleString('en-IN')}</div>
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
          <div className="metric-value">{(summary.totalUsers || 0).toLocaleString('en-IN')}</div>
          <div className="metric-footer">
            <span className="user-ratio-pill">
              {summary.totalUsers > 0 ? Math.round((summary.newUsersCount / summary.totalUsers) * 100) : 0}% New Users
            </span>
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
              <span className="card-subtitle">Monthly dynamic earnings & completed order trends</span>
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
                const x = (i / Math.max(monthlyTrends.length - 1, 1)) * (svgWidth - 40) + 20;
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
                  <span className="user-type-count">
                    {(summary.newUsersCount || 0).toLocaleString('en-IN')} ({summary.totalUsers > 0 ? Math.round((summary.newUsersCount / summary.totalUsers) * 100) : 0}%)
                  </span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill new-users-fill" 
                    style={{ width: `${summary.totalUsers > 0 ? Math.round((summary.newUsersCount / summary.totalUsers) * 100) : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="user-type-item">
                <div className="user-type-header">
                  <span className="user-type-title">
                    <span className="type-indicator existing-user-indicator"></span> Existing Users
                  </span>
                  <span className="user-type-count">
                    {(summary.existingUsersCount || 0).toLocaleString('en-IN')} ({summary.totalUsers > 0 ? Math.round((summary.existingUsersCount / summary.totalUsers) * 100) : 0}%)
                  </span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill existing-users-fill" 
                    style={{ width: `${summary.totalUsers > 0 ? Math.round((summary.existingUsersCount / summary.totalUsers) * 100) : 0}%` }}
                  ></div>
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
            {workshopStats.length > 0 ? (
              workshopStats.map((item, idx) => (
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
              ))
            ) : (
              <div className="empty-state">No workshop registrations recorded yet.</div>
            )}
          </div>
        </div>

        {/* Live Website Event Feed */}
        <div className="mb-chart-card event-feed-card">
          <div className="card-title-bar">
            <h3>Live Event Stream</h3>
            <span className="card-subtitle">Real-time website signups & order events</span>
          </div>

          <div className="event-list">
            {recentEvents.length > 0 ? (
              recentEvents.map((evt) => (
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
              ))
            ) : (
              <div className="empty-state">No recent activity events.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterBoardView;
