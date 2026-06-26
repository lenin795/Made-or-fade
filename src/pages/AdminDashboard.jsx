import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDashboardStats } from '../services/pollService';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        setError('Could not load dashboard stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-subtitle">Welcome back! Here's how Made or Fade is performing.</p>

      {error && <p className="alert alert-error">{error}</p>}

      {stats && (
        <div className="dashboard-grid">
          <DashboardCard label="Total Polls" value={stats.totalPolls} icon="🗳️" accent="blue" />
          <DashboardCard label="Active Polls" value={stats.activePolls} icon="✅" accent="green" />
          <DashboardCard label="Total Votes" value={stats.totalVotes} icon="📊" accent="red" />
          <DashboardCard label="Emails Collected" value={stats.emailsCollected} icon="📧" accent="blue" />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
