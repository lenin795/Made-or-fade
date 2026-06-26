import React from 'react';
import '../styles/VoteButtons.css';

const VoteButtons = ({ onVote, disabled = false, loadingVote = null }) => {
  return (
    <div className="vote-buttons">
      <button
        type="button"
        className="vote-btn vote-btn-made"
        onClick={() => onVote('Made')}
        disabled={disabled}
      >
        {loadingVote === 'Made' ? '...' : '✅ Made'}
      </button>
      <button
        type="button"
        className="vote-btn vote-btn-fade"
        onClick={() => onVote('Fade')}
        disabled={disabled}
      >
        {loadingVote === 'Fade' ? '...' : '❌ Fade'}
      </button>
    </div>
  );
};

export default VoteButtons;
