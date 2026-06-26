import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { logout, username } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        Made<span className="navbar-logo-accent">orFade</span>
        <span className="sidebar-brand-tag">Admin</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className="sidebar-link">
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin/manage-polls" className="sidebar-link">
          🗳️ Manage Polls
        </NavLink>
        <NavLink to="/admin/email-captures" className="sidebar-link">
          📧 Email Captures
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        {username && <p className="sidebar-username">Signed in as {username}</p>}
        <button type="button" className="sidebar-logout" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
