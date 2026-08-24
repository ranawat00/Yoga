import React, { useEffect, useState } from 'react';
import { fetchRegistrations } from '../../api/registrations';
import { useApp } from '../../hooks/useApp';
import './RegistrationsPage.css';

export default function RegistrationsPage() {
  const { addNotification } = useApp();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchRegistrations();
      if (res.success) {
        setRegistrations(res.data || []);
      } else {
        if (addNotification) addNotification(res.message || 'Failed to load registrations', 'error');
      }
    } catch (err) {
      if (addNotification) addNotification('Error connecting to database API server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      (reg.name && reg.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (reg.phone && reg.phone.includes(searchQuery)) ||
      (reg.email && reg.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBatch = selectedBatch === 'ALL' || reg.batch === selectedBatch;

    return matchesSearch && matchesBatch;
  });

  return (
    <div className="registrations-page">
      <div className="registrations-header-banner">
        <div className="registrations-container">
          <span className="registrations-badge">DATABASE MONITOR</span>
          <h1 className="registrations-title">Saved User Registrations</h1>
          <p className="registrations-subtitle">
            Live records stored directly in MongoDB from website registration forms
          </p>
        </div>
      </div>

      <div className="registrations-container registrations-content">
        {/* Controls Bar */}
        <div className="registrations-controls">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <select
              className="batch-filter"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="ALL">All Batches / Plans</option>
              <option value="Morning Batch (6:00 AM - 7:15 AM IST)">Morning Batch</option>
              <option value="Evening Batch (6:00 PM - 7:15 PM IST)">Evening Batch</option>
              <option value="Monthly Plan">Monthly Plan</option>
              <option value="3 Months Plan">3 Months Plan</option>
              <option value="Annual Plan">Annual Plan</option>
            </select>

            <button className="refresh-btn" onClick={loadData} disabled={loading}>
              <svg className={loading ? 'spin' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              <span>{loading ? 'Refreshing...' : 'Refresh Live DB'}</span>
            </button>
          </div>
        </div>

        {/* Stats Counter */}
        <div className="registrations-stats">
          <div className="stat-card">
            <span className="stat-num">{registrations.length}</span>
            <span className="stat-label">Total DB Records</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">
              {registrations.filter(r => r.source && r.source.includes('Modal')).length}
            </span>
            <span className="stat-label">Free Workshop Registrations</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">
              {registrations.filter(r => r.source && r.source.includes('Together')).length}
            </span>
            <span className="stat-label">Daily Yoga Together Registrations</span>
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <div className="registrations-loading">
            <div className="spinner"></div>
            <p>Fetching records from MongoDB...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="registrations-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            <h3>No Registrations Found</h3>
            <p>No matching database records found for your search query.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Details</th>
                  <th>Contact Info</th>
                  <th>Batch / Plan</th>
                  <th>Source Form</th>
                  <th>Status</th>
                  <th>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg, index) => (
                  <tr key={reg._id || index}>
                    <td className="col-idx">{index + 1}</td>
                    <td>
                      <div className="user-name">{reg.name}</div>
                    </td>
                    <td>
                      <div className="user-contact">
                        <span className="phone-num">📞 {reg.phone}</span>
                        {reg.email && <span className="email-addr">✉️ {reg.email}</span>}
                      </div>
                    </td>
                    <td>
                      <span className="batch-pill">{reg.batch}</span>
                    </td>
                    <td>
                      <span className="source-tag">{reg.source || 'Website Modal'}</span>
                    </td>
                    <td>
                      <span className="status-badge status-registered">
                        {reg.status || 'SAVED'}
                      </span>
                    </td>
                    <td className="col-date">
                      {reg.createdAt
                        ? new Date(reg.createdAt).toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Just Now'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
