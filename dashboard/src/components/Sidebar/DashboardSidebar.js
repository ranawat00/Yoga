import React from 'react';
import './DashboardSidebar.css';

const DashboardSidebar = ({ activeTab, setActiveTab, currentUser, onLogout }) => {
  let user = currentUser;
  if (!user) {
    try {
      const stored = localStorage.getItem('adminUser');
      if (stored) user = JSON.parse(stored);
    } catch (e) {}
  }

  const userName = user?.name || 'Admin User';
  const userEmail = user?.email || 'admin@yogahealers.com';
  const avatarInitial = userName ? userName.charAt(0).toUpperCase() : 'A';

  const menuItems = [
    { id: 'masterboard', label: 'Master Board', icon: '📊' },
    { id: 'traffic', label: 'Website Traffic', icon: '📈' },
    { id: 'workshops', label: 'Workshops', icon: '🧘' },
    { id: 'registrations', label: 'Registrations', icon: '📝' },
    { id: 'orders', label: 'Orders', icon: '🛍️' },
    { id: 'coupons', label: 'Coupons', icon: '🏷️' },
    { id: 'referrals', label: 'Referral Codes', icon: '🎫' },
    { id: 'inquiries', label: 'Inquiries', icon: '📬' },
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
          <div className="avatar">{avatarInitial}</div>
          <div className="user-details">
            <span className="user-name">{userName}</span>
            <span className="user-email">{userEmail}</span>
          </div>
        </div>
        <button 
          className="sidebar-logout-btn" 
          onClick={onLogout} 
          title="Log Out of Admin Dashboard"
        >
          <svg className="logout-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
