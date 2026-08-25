import React, { useState } from 'react';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import MasterBoardView from '../../components/Dashboard/MasterBoard/MasterBoardView';
import './DashboardPage.css';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('masterboard');

  const getHeaderTitle = () => {
    if (activeTab === 'masterboard') return 'Master Board Overview';
    return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  };

  return (
    <div className="dashboard-container">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="dashboard-main-content">
        <DashboardHeader title={getHeaderTitle()} />
        
        <div className="dashboard-body">
          {activeTab === 'masterboard' && <MasterBoardView />}

          {activeTab !== 'masterboard' && (
            <div className="dashboard-section-card">
              <h3>{activeTab.toUpperCase()} Section</h3>
              <p>Manage your {activeTab} here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
