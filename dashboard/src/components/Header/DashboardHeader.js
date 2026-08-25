import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ title = "Dashboard", searchQuery = "", onSearchChange }) => {
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
      </div>
    </header>
  );
};

export default DashboardHeader;
