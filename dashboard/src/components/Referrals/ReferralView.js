import React, { useState, useEffect, useCallback } from 'react';
import './ReferralView.css';

const API_BASE = process.env.REACT_APP_API_URL || '';

function generateRandomCode(prefix = 'YHO') {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = prefix + '-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

const ReferralView = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({
    referralCode: generateRandomCode(),
    collegeName: '',
    createdFor: 'Student',
    discountPercent: 10,
    maxUses: 100,
    expiryDate: '',
  });

  const fetchReferrals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/referrals`);
      const json = await res.json();
      if (json.success) setReferrals(json.data);
    } catch (e) {
      console.error('Failed to fetch referrals', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReferrals(); }, [fetchReferrals]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/referrals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg(`✅ Code "${form.referralCode}" created successfully!`);
        setShowForm(false);
        setForm({ ...form, referralCode: generateRandomCode() });
        fetchReferrals();
      } else {
        setErrorMsg(json.message || 'Failed to create code.');
      }
    } catch (e) {
      setErrorMsg('Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await fetch(`${API_BASE}/api/referrals/${id}/toggle`, { method: 'PUT' });
      fetchReferrals();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id, code) => {
    if (!window.confirm(`Delete referral code "${code}"?`)) return;
    try {
      await fetch(`${API_BASE}/api/referrals/${id}`, { method: 'DELETE' });
      fetchReferrals();
    } catch (e) { console.error(e); }
  };

  const filtered = referrals.filter(r =>
    r.referralCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.collegeName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.createdFor || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="referral-view">
      {/* Header */}
      <div className="referral-header">
        <div>
          <h2 className="referral-title">🎫 Referral Codes</h2>
          <p className="referral-subtitle">Generate and manage student signup referral codes</p>
        </div>
        <button className="referral-create-btn" onClick={() => { setShowForm(!showForm); setErrorMsg(''); setSuccessMsg(''); }}>
          {showForm ? '✕ Cancel' : '+ Generate Code'}
        </button>
      </div>

      {/* Success / Error messages */}
      {successMsg && <div className="referral-alert success">{successMsg}</div>}
      {errorMsg && <div className="referral-alert error">{errorMsg}</div>}

      {/* Create Form */}
      {showForm && (
        <div className="referral-form-card">
          <h3>Generate New Referral Code</h3>
          <form onSubmit={handleSubmit} className="referral-form-grid">
            <div className="rform-group">
              <label>Referral Code</label>
              <div className="code-input-row">
                <input
                  type="text"
                  value={form.referralCode}
                  onChange={e => setForm({ ...form, referralCode: e.target.value.toUpperCase() })}
                  required
                  className="rform-input code-input"
                  placeholder="e.g. YHO-ABC123"
                />
                <button type="button" className="regen-btn" onClick={() => setForm({ ...form, referralCode: generateRandomCode() })} title="Auto-generate">
                  🔄
                </button>
              </div>
            </div>

            <div className="rform-group">
              <label>College / Institution Name</label>
              <input type="text" value={form.collegeName} onChange={e => setForm({ ...form, collegeName: e.target.value })} className="rform-input" placeholder="e.g. DIT University" />
            </div>

            <div className="rform-group">
              <label>Created For</label>
              <select value={form.createdFor} onChange={e => setForm({ ...form, createdFor: e.target.value })} className="rform-input">
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="rform-group">
              <label>Discount (%)</label>
              <input type="number" min={0} max={100} value={form.discountPercent} onChange={e => setForm({ ...form, discountPercent: e.target.value })} className="rform-input" />
            </div>

            <div className="rform-group">
              <label>Max Uses</label>
              <input type="number" min={1} value={form.maxUses} onChange={e => setForm({ ...form, maxUses: e.target.value })} className="rform-input" />
            </div>

            <div className="rform-group">
              <label>Expiry Date (optional)</label>
              <input type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} className="rform-input" />
            </div>

            <div className="rform-actions">
              <button type="submit" className="rform-submit-btn" disabled={submitting}>
                {submitting ? 'Creating...' : '🎫 Create Referral Code'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="referral-search-row">
        <input
          type="text"
          placeholder="Search by code, college, or type..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="referral-search-input"
        />
        <span className="referral-count">{filtered.length} code{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="referral-loading">Loading referral codes...</div>
      ) : filtered.length === 0 ? (
        <div className="referral-empty">
          <div className="empty-icon">🎫</div>
          <p>No referral codes found. Click <strong>"+ Generate Code"</strong> to create your first one.</p>
        </div>
      ) : (
        <div className="referral-table-wrap">
          <table className="referral-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>College / Institution</th>
                <th>Created For</th>
                <th>Discount</th>
                <th>Uses</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r._id}>
                  <td>
                    <div className="code-cell">
                      <strong className="code-badge">🎫 {r.referralCode}</strong>
                      <button
                        className={`copy-btn ${copiedCode === r.referralCode ? 'copied' : ''}`}
                        onClick={() => handleCopy(r.referralCode)}
                        title="Copy Code"
                      >
                        {copiedCode === r.referralCode ? '✓ Copied' : '📋 Copy'}
                      </button>
                    </div>
                  </td>
                  <td>{r.collegeName || '-'}</td>
                  <td>
                    <span className="type-badge">{r.createdFor || 'Student'}</span>
                  </td>
                  <td>{r.discountPercent}%</td>
                  <td>
                    <span className={`uses-cell ${r.usedCount >= r.maxUses ? 'exhausted' : ''}`}>
                      {r.usedCount} / {r.maxUses}
                    </span>
                  </td>
                  <td>{r.expiryDate ? new Date(r.expiryDate).toLocaleDateString() : '—'}</td>
                  <td>
                    <span className={`status-badge ${r.isActive ? 'active' : 'inactive'}`}>
                      {r.isActive ? '● Active' : '○ Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-btn toggle-btn" onClick={() => handleToggle(r._id)}>
                        {r.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button className="action-btn delete-btn" onClick={() => handleDelete(r._id, r.referralCode)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReferralView;
