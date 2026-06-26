import React, { useState } from 'react';
import EmailForm from './EmailForm';
import CopyButton from './CopyButton';
import { unlockOffer } from '../services/emailService';
import '../styles/Modal.css';

const UnlockOfferModal = ({ pollId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offer, setOffer] = useState(null); // { discountCode, shopUrl }

  const handleSubmit = async (email) => {
    setLoading(true);
    setError('');
    try {
      const res = await unlockOffer(email, pollId);
      setOffer(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {!offer ? (
          <>
            <h2 className="modal-title">🎉 Unlock Your Offer</h2>
            <p className="modal-subtitle">Thanks for voting! Enter your email to reveal the discount code.</p>
            <EmailForm onSubmit={handleSubmit} loading={loading} error={error} />
          </>
        ) : (
          <div className="offer-reveal">
            <h2 className="modal-title">Here's Your Code 🎁</h2>
            <div className="discount-code-box">{offer.discountCode}</div>
            <div className="offer-actions">
              <CopyButton text={offer.discountCode} label="Copy Discount Code" />
              <a
                href={offer.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Shop Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnlockOfferModal;
