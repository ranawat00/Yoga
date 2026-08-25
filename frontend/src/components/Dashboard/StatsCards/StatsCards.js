import React from 'react';
import './StatsCards.css';

const StatsCards = () => {
  const stats = [
    { title: 'Total Registrations', value: '1,248', change: '+12%', positive: true, icon: '📝' },
    { title: 'Active Workshops', value: '8', change: '2 upcoming', positive: true, icon: '🧘' },
    { title: 'Total Revenue', value: '₹1,84,500', change: '+18%', positive: true, icon: '💰' },
    { title: 'Total Users', value: '3,420', change: '+5%', positive: true, icon: '👥' },
  ];

  return (
    <div className="stats-cards-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <span className="stat-title">{stat.title}</span>
            <span className="stat-icon">{stat.icon}</span>
          </div>
          <div className="stat-body">
            <span className="stat-value">{stat.value}</span>
            <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
