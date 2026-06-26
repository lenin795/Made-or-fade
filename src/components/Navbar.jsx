import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // Hide the public navbar entirely on admin routes (admin has its own Sidebar nav).
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Made<span className="navbar-logo-accent">orFade</span>
        </Link>

        <nav className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/create-poll" onClick={closeMenu}>
            Create Private Poll
          </Link>
          <Link to="/admin/login" className="navbar-admin-link" onClick={closeMenu}>
            Admin
          </Link>
        </nav>

        <button
          type="button"
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
