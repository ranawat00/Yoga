import React, { useState, useEffect } from 'react';
import './TrafficView.css';

const TrafficView = () => {
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrafficStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/traffic/stats');
      const json = await res.json();
      if (json.success) {
        setTrafficData(json.data);
        setError(null);
      } else {
        setError(json.message || 'Failed to load traffic statistics');
      }
    } catch (err) {
      console.error('Traffic stats error:', err);
      setError('Unable to connect to live traffic server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficStats();
    // Auto-refresh every 30 seconds for live monitoring
    const interval = setInterval(fetchTrafficStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !trafficData) {
    return <div className="masterboard-loading">Loading Live Website Traffic Data...</div>;
  }

  if (error && !trafficData) {
    return (
      <div className="masterboard-error">
        <p>{error}</p>
        <button onClick={fetchTrafficStats} className="retry-btn">
          Retry Traffic Sync
        </button>
      </div>
    );
  }

  const summary = trafficData?.summary || { totalPageViews: 0, uniqueVisitors: 0, todayViews: 0, todayVisitors: 0 };
  const deviceStats = trafficData?.deviceStats || { desktop: 0, mobile: 0, tablet: 0, desktopPercent: 100, mobilePercent: 0, tabletPercent: 0 };
  const topPages = trafficData?.topPages || [];
  const recentLogs = trafficData?.recentLogs || [];

  return (
    <div className="traffic-view-container">
      {/* Header */}
      <div className="traffic-header-bar">
        <h2>Website Traffic Analytics</h2>
        <p>Monitor live page visits, unique visitors, device categories, and real-time visitor activity stream.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="traffic-kpi-grid">
        <div className="traffic-kpi-card">
          <div className="traffic-kpi-header">
            <span className="traffic-kpi-label">Total Page Views</span>
            <span className="traffic-kpi-icon">👁️</span>
          </div>
          <div className="traffic-kpi-val">{(summary.totalPageViews || 0).toLocaleString('en-IN')}</div>
          <div className="traffic-kpi-sub">Total page hits across site</div>
        </div>

        <div className="traffic-kpi-card">
          <div className="traffic-kpi-header">
            <span className="traffic-kpi-label">Unique Visitors</span>
            <span className="traffic-kpi-icon">👤</span>
          </div>
          <div className="traffic-kpi-val">{(summary.uniqueVisitors || 0).toLocaleString('en-IN')}</div>
          <div className="traffic-kpi-sub">Distinct browser visitors</div>
        </div>

        <div className="traffic-kpi-card">
          <div className="traffic-kpi-header">
            <span className="traffic-kpi-label">Today's Traffic</span>
            <span className="traffic-kpi-icon">📈</span>
          </div>
          <div className="traffic-kpi-val">{(summary.todayViews || 0).toLocaleString('en-IN')}</div>
          <div className="traffic-kpi-sub">{summary.todayVisitors || 0} unique visitors today</div>
        </div>

        <div className="traffic-kpi-card">
          <div className="traffic-kpi-header">
            <span className="traffic-kpi-label">Mobile Traffic</span>
            <span className="traffic-kpi-icon">📱</span>
          </div>
          <div className="traffic-kpi-val">{deviceStats.mobilePercent}%</div>
          <div className="traffic-kpi-sub">{deviceStats.mobile || 0} mobile visits</div>
        </div>
      </div>

      {/* Analytics Breakdown Row */}
      <div className="traffic-analytics-row">
        {/* Top Visited Pages */}
        <div className="traffic-card-block">
          <h3>
            <span>Top Visited Pages</span>
            <span style={{ fontSize: '0.8rem', color: '#5c8862', fontWeight: 600 }}>Live Rankings</span>
          </h3>

          <div className="top-pages-list">
            {topPages.length > 0 ? (
              topPages.map((item, idx) => (
                <div key={idx} className="top-page-item">
                  <div className="top-page-info">
                    <span>{item.page}</span>
                    <span className="page-hits-badge">{item.count} views ({item.percentage}%)</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-fill" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state" style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>
                No page views recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="traffic-card-block">
          <h3>Device Categories</h3>
          <div className="device-bars-container">
            <div className="device-item">
              <div className="device-label-row">
                <span>🖥️ Desktop</span>
                <span>{deviceStats.desktop} ({deviceStats.desktopPercent}%)</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: `${deviceStats.desktopPercent}%`, background: '#2563eb' }}></div>
              </div>
            </div>

            <div className="device-item">
              <div className="device-label-row">
                <span>📱 Mobile</span>
                <span>{deviceStats.mobile} ({deviceStats.mobilePercent}%)</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: `${deviceStats.mobilePercent}%`, background: '#db2777' }}></div>
              </div>
            </div>

            <div className="device-item">
              <div className="device-label-row">
                <span>💻 Tablet</span>
                <span>{deviceStats.tablet} ({deviceStats.tabletPercent}%)</span>
              </div>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: `${deviceStats.tabletPercent}%`, background: '#ea580c' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Visitor Activity Stream Table */}
      <div className="recent-logs-section">
        <h3>Live Real-Time Visitor Activity Stream</h3>
        <div className="logs-table-wrapper">
          <table className="traffic-logs-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Page Visited</th>
                <th>URL Path</th>
                <th>Device</th>
                <th>Visitor ID</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.length > 0 ? (
                recentLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.time}</td>
                    <td style={{ fontWeight: 600 }}>{log.page}</td>
                    <td style={{ color: '#6b7280' }}>{log.path}</td>
                    <td>
                      <span className={`device-badge ${log.device ? log.device.toLowerCase() : 'desktop'}`}>
                        {log.device === 'Mobile' ? '📱 Mobile' : (log.device === 'Tablet' ? '💻 Tablet' : '🖥️ Desktop')}
                      </span>
                    </td>
                    <td>
                      <span className="visitor-id-tag">{log.visitorId}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#9ca3af' }}>
                    No recent visitor activity recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrafficView;
