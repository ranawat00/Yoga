import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({ 
  title, 
  columns, 
  data = [], 
  loading = false, 
  onAddNew, 
  searchPlaceholder = "Search records...",
  globalSearchQuery = "",
  onSearchChange
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const activeQuery = (globalSearchQuery !== undefined && globalSearchQuery !== "" ? globalSearchQuery : localSearchTerm).trim().toLowerCase();

  const handleInputChange = (e) => {
    const val = e.target.value;
    setLocalSearchTerm(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData ? e.clipboardData.getData('text') : '';
    if (pastedText) {
      const cleanText = pastedText.replace(/[\r\n]+/g, ' ').trim();
      setLocalSearchTerm(cleanText);
      if (onSearchChange) {
        onSearchChange(cleanText);
      }
    }
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  const filteredData = data.filter((row) => {
    if (!activeQuery) return true;

    return Object.keys(row).some((key) => {
      const val = row[key];
      if (val === null || val === undefined) return false;
      if (typeof val === 'object') {
        return JSON.stringify(val).toLowerCase().includes(activeQuery);
      }
      return String(val).toLowerCase().includes(activeQuery);
    });
  });

  return (
    <div className="data-table-container">
      <div className="table-header-bar">
        <div className="header-info">
          <h3>{title}</h3>
          <span className="count-badge">{filteredData.length} records</span>
        </div>

        <div className="header-controls">
          <div className="table-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={globalSearchQuery !== "" ? globalSearchQuery : localSearchTerm}
              onChange={handleInputChange}
              onInput={handleInputChange}
              onPaste={handlePaste}
              autoComplete="off"
              spellCheck="false"
            />
            {(globalSearchQuery || localSearchTerm) && (
              <button 
                onClick={handleClear}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.85rem', padding: '0 4px' }}
                title="Clear search"
                type="button"
              >
                ✕
              </button>
            )}
          </div>

          {onAddNew && (
            <button className="add-btn" onClick={onAddNew}>
              + Add {title.slice(0, -1)}
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="table-loading">Loading records from server...</div>
      ) : filteredData.length === 0 ? (
        <div className="table-empty">No matching records found.</div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="custom-data-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={row.id || index}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? (
                        col.render(row[col.key], row)
                      ) : col.key === 'status' ? (
                        <span className={`status-pill ${String(row[col.key]).toLowerCase()}`}>
                          {row[col.key]}
                        </span>
                      ) : col.key === 'total' || col.key === 'price' ? (
                        `₹${Number(row[col.key]).toLocaleString('en-IN')}`
                      ) : (
                        row[col.key] || '—'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
