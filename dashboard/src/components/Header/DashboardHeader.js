import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ title = "Dashboard", searchQuery = "", onSearchChange, onLogout }) => {
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handlePaste = (e) => {
    // Explicit paste handler to ensure pasted clipboard text is sanitized and applied immediately
    const pastedText = e.clipboardData ? e.clipboardData.getData('text') : '';
    if (pastedText && onSearchChange) {
      // Clean up multiline or weird whitespace if pasted
      const cleanText = pastedText.replace(/[\r\n]+/g, ' ').trim();
      setTimeout(() => {
        onSearchChange(cleanText);
      }, 0);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>

      <div className="header-actions">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search records across dashboard..." 
            value={searchQuery || ''}
            onChange={handleInputChange}
            onInput={handleInputChange}
            onPaste={handlePaste}
            autoComplete="off"
            spellCheck="false"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn" 
              onClick={() => onSearchChange && onSearchChange('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.9rem', padding: '0 4px' }}
              title="Clear search"
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        <button className="icon-btn" title="Notifications">
          🔔
          <span className="badge-dot"></span>
        </button>

        <button className="primary-action-btn">
          + New Workshop
        </button>

        <button 
          className="header-logout-btn" 
          onClick={onLogout}
          title="Log Out of Dashboard"
        >
          <svg className="logout-svg-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
