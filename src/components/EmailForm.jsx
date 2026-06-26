import React, { useState } from 'react';
import '../styles/Modal.css';

const EmailForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubmit(email.trim());
  };

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <label htmlFor="unlock-email" className="email-form-label">
        Enter your email to unlock your discount code
      </label>
      <input
        id="unlock-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-form-input"
      />

      {error && <p className="alert alert-error">{error}</p>}

      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
        {loading ? 'Unlocking...' : 'Unlock Offer'}
      </button>
    </form>
  );
};

export default EmailForm;
