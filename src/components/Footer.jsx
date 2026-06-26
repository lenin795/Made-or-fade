import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Made or Fade. All rights reserved.</p>
        <p className="footer-tagline">Vote on what's trending. Made it, or fading fast?</p>
      </div>
    </footer>
  );
};

export default Footer;
