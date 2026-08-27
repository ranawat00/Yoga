import React, { useState, useEffect } from 'react';
import DashboardSidebar from './components/Sidebar/DashboardSidebar';
import DashboardHeader from './components/Header/DashboardHeader';
import MasterBoardView from './components/MasterBoard/MasterBoardView';
import TrafficView from './components/Traffic/TrafficView';
import DataTable from './components/DataTable/DataTable';
import CouponModal from './components/Coupons/CouponModal';
import AdminAuthView from './components/Auth/AdminAuthView';
import LogoutModal from './components/LogoutModal/LogoutModal';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('adminToken');
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('adminUser');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });
  const [activeTab, setActiveTab] = useState('masterboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const fetchTabData = async (tab) => {
    if (!isAuthenticated) return;
    if (tab === 'masterboard' || tab === 'traffic' || tab === 'settings') return;

    setLoading(true);
    const endpoint = tab === 'coupons' ? '/api/coupons' : (tab === 'inquiries' ? '/api/contact' : `/api/dashboard/${tab}`);
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      if (json.success) {
        setTableData(json.data);
      } else {
        setTableData([]);
      }
    } catch (err) {
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab]);

  const getHeaderTitle = () => {
    if (activeTab === 'masterboard') return 'Master Board Overview';
    if (activeTab === 'traffic') return 'Live Website Traffic Analytics';
    if (activeTab === 'inquiries') return 'Contact Form Messages & Inquiries';
    return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  };

  const handleCouponSaved = (coupon, isEdit) => {
    fetchTabData('coupons');
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setIsCouponModalOpen(true);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleCoupon = async (id) => {
    try {
      await fetch(`/api/coupons/${id}/toggle`, { method: 'PUT' });
      fetchTabData('coupons');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await fetch(`/api/coupons/${id}`, { method: 'DELETE' });
      fetchTabData('coupons');
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleInquiryStatus = async (id) => {
    try {
      await fetch(`/api/contact/${id}/status`, { method: 'PUT' });
      fetchTabData('inquiries');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      fetchTabData('inquiries');
    } catch (err) {
      console.error(err);
    }
  };

  // Table Column Definitions
  const orderColumns = [
    { key: 'id', label: 'Order ID' },
    { key: 'customer', label: 'Customer Name' },
    { key: 'email', label: 'Email' },
    { key: 'items', label: 'Items' },
    { key: 'total', label: 'Total Amount' },
    { key: 'payment', label: 'Payment Method' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' }
  ];

  const registrationColumns = [
    { key: 'id', label: 'Reg ID' },
    { key: 'name', label: 'Full Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'workshop', label: 'Workshop Event' },
    { key: 'batch', label: 'Batch Timing' },
    { 
      key: 'couponCode', 
      label: 'Coupon Code', 
      render: (val) => val ? <span style={{ background: '#eaf3ec', color: '#5c8862', padding: '3px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.82rem' }}>🏷️ {val}</span> : <span style={{ color: '#9ca3af' }}>-</span>
    },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' }
  ];

  const userColumns = [
    { key: 'id', label: 'User ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'dateJoined', label: 'Date Joined' },
    { key: 'status', label: 'Status' }
  ];

  const workshopColumns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Workshop Title' },
    { key: 'category', label: 'Category' },
    { key: 'duration', label: 'Duration' },
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Status' }
  ];

  const couponColumns = [
    { 
      key: 'code', 
      label: 'Coupon Code', 
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: '6px', fontSize: '0.92rem' }}>🏷️ {val}</strong>
          <button
            onClick={() => handleCopyCode(val)}
            style={{
              padding: '3px 8px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              background: copiedCode === val ? '#dcfce7' : '#ffffff',
              color: copiedCode === val ? '#15803d' : '#374151',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            title="Copy Code to Clipboard"
          >
            {copiedCode === val ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
      ) 
    },
    { 
      key: 'discountValue', 
      label: 'Discount', 
      render: (val, row) => row.discountType === 'percentage' ? `${val}% OFF` : `₹${val} OFF` 
    },
    { key: 'minAmount', label: 'Min Purchase', render: (val) => `₹${val}` },
    { key: 'applicableWorkshop', label: 'Workshop' },
    { key: 'usedCount', label: 'Uses', render: (val, row) => `${val} / ${row.usageLimit}` },
    { 
      key: 'isActive', 
      label: 'Status', 
      render: (val) => (
        <span className={`status-pill ${val ? 'active' : 'pending'}`}>
          {val ? 'ACTIVE' : 'INACTIVE'}
        </span>
      ) 
    },
    {
      key: '_id',
      label: 'Actions',
      render: (id, row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #5c8862', cursor: 'pointer', background: '#eaf3ec', color: '#5c8862', fontWeight: 600, fontSize: '0.8rem' }}
            onClick={() => handleEditCoupon(row)}
          >
            ✏️ Edit
          </button>
          <button 
            style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #d1d5db', cursor: 'pointer', background: '#fff', color: '#374151', fontSize: '0.8rem' }}
            onClick={() => handleToggleCoupon(row._id || id)}
          >
            {row.isActive ? 'Disable' : 'Enable'}
          </button>
          <button 
            style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: '#fee2e2', color: '#991b1b', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
            onClick={() => handleDeleteCoupon(row._id || id)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const inquiryColumns = [
    { key: 'id', label: 'MSG ID' },
    { key: 'name', label: 'Contact Name' },
    { key: 'email', label: 'Email ID' },
    { key: 'phone', label: 'Phone' },
    { 
      key: 'category', 
      label: 'Category', 
      render: (val) => <span style={{ background: '#ede9fe', color: '#6b00d7', padding: '3px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '0.82rem' }}>{val || 'General'}</span> 
    },
    { 
      key: 'message', 
      label: 'Message', 
      render: (val) => <span title={val} style={{ maxWidth: '200px', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span> 
    },
    { key: 'city', label: 'City' },
    { key: 'date', label: 'Date' },
    { 
      key: 'status', 
      label: 'Status', 
      render: (val) => (
        <span className={`status-pill ${val === 'Resolved' ? 'active' : 'pending'}`}>
          {val || 'Pending'}
        </span>
      ) 
    },
    {
      key: '_id',
      label: 'Actions',
      render: (id, row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #5c8862', cursor: 'pointer', background: '#eaf3ec', color: '#5c8862', fontWeight: 600, fontSize: '0.8rem' }}
            onClick={() => handleToggleInquiryStatus(row._id || id)}
          >
            {row.status === 'Resolved' ? 'Reopen' : '✓ Resolve'}
          </button>
          <button 
            style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: '#fee2e2', color: '#991b1b', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
            onClick={() => handleDeleteInquiry(row._id || id)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch('/api/auth/admin/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error('Logout API call error:', err);
    } finally {
      setLogoutLoading(false);
    }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('token');
    sessionStorage.clear();
    setCurrentUser(null);
    setIsLogoutModalOpen(false);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminAuthView 
        onLoginSuccess={(userData) => {
          if (userData) setCurrentUser(userData);
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  return (
    <div className="dashboard-app-container">
      <DashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onLogout={handleLogoutClick} 
      />
      
      <main className="dashboard-main-area">
        <DashboardHeader 
          title={getHeaderTitle()} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogout={handleLogoutClick}
        />
        
        <div className="dashboard-content-body">
          {activeTab === 'masterboard' && <MasterBoardView />}
          {activeTab === 'traffic' && <TrafficView />}

          {activeTab === 'orders' && (
            <DataTable
              title="Customer Orders"
              columns={orderColumns}
              data={tableData}
              loading={loading}
              globalSearchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search orders by customer, email or ID..."
            />
          )}

          {activeTab === 'registrations' && (
            <DataTable
              title="Workshop Registrations"
              columns={registrationColumns}
              data={tableData}
              loading={loading}
              globalSearchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search registrations by name, phone or workshop..."
            />
          )}

          {activeTab === 'inquiries' && (
            <DataTable
              title="Contact Form Messages & Inquiries"
              columns={inquiryColumns}
              data={tableData}
              loading={loading}
              globalSearchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search inquiries by name, email, phone or message..."
            />
          )}

          {activeTab === 'users' && (
            <DataTable
              title="Platform Users"
              columns={userColumns}
              data={tableData}
              loading={loading}
              globalSearchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search users by name or email..."
            />
          )}

          {activeTab === 'workshops' && (
            <DataTable
              title="Yoga Workshops"
              columns={workshopColumns}
              data={tableData}
              loading={loading}
              globalSearchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddNew={() => alert('Add New Workshop modal launched!')}
              searchPlaceholder="Search workshops..."
            />
          )}

          {activeTab === 'coupons' && (
            <DataTable
              title="Discount Coupons"
              columns={couponColumns}
              data={tableData}
              loading={loading}
              globalSearchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddNew={() => {
                setEditingCoupon(null);
                setIsCouponModalOpen(true);
              }}
              searchPlaceholder="Search coupon code..."
            />
          )}

          {activeTab === 'settings' && (
            <div className="dashboard-placeholder-card">
              <h3>Platform Settings</h3>
              <p>Configure admin preferences, notification webhooks, and payment gateway options.</p>
            </div>
          )}
        </div>
      </main>

      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => {
          setIsCouponModalOpen(false);
          setEditingCoupon(null);
        }}
        onSave={handleCouponSaved}
        initialData={editingCoupon}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        loading={logoutLoading}
      />
    </div>
  );
}

export default App;
