import React from 'react';
import '../styles/Dashboard.css';

const DashboardCard = ({ label, value, icon, accent = 'blue' }) => {
  return (
    <div className={`dashboard-card dashboard-card-${accent}`}>
      <div className="dashboard-card-icon">{icon}</div>
      <div>
        <p className="dashboard-card-value">{value}</p>
        <p className="dashboard-card-label">{label}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
