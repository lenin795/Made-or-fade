import React from 'react';
import '../styles/PollResults.css';

const PollResults = ({ madePercent = 0, fadePercent = 0, totalVotes = 0 }) => {
  return (
    <div className="poll-results">
      <div className="results-bar">
        <div className="results-bar-made" style={{ width: `${madePercent}%` }} />
        <div className="results-bar-fade" style={{ width: `${fadePercent}%` }} />
      </div>

      <div className="results-stats">
        <div className="result-stat">
          <span className="result-dot result-dot-made" />
          Made <strong>{madePercent}%</strong>
        </div>
        <div className="result-stat">
          <span className="result-dot result-dot-fade" />
          Fade <strong>{fadePercent}%</strong>
        </div>
      </div>

      <p className="results-total">{totalVotes} total vote{totalVotes === 1 ? '' : 's'}</p>
    </div>
  );
};

export default PollResults;
