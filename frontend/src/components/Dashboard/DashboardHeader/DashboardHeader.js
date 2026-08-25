import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ title = "Dashboard" }) => {
  return (
    <header className="dashboard-header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>

      <div className="header-actions">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search anything..." />
        </div>

        <button className="icon-btn" title="Notifications">
          🔔
          <span className="badge-dot"></span>
        </button>

        <button className="primary-action-btn">
          + New Workshop
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
