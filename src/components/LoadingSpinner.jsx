import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <div className={fullPage ? 'spinner-wrapper spinner-fullpage' : 'spinner-wrapper'}>
      <div className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
