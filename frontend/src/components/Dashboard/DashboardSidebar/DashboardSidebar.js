import React from 'react';
import './DashboardSidebar.css';

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'masterboard', label: 'Master Board', icon: '📊' },
    { id: 'workshops', label: 'Workshops', icon: '🧘' },
    { id: 'registrations', label: 'Registrations', icon: '📝' },
    { id: 'orders', label: 'Orders', icon: '🛍️' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <h2>Yoga Healers</h2>
        <span className="brand-badge">Admin</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">A</div>
          <div className="user-details">
            <span className="user-name">Admin User</span>
            <span className="user-email">admin@yogahealers.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
