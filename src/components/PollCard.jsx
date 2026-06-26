import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PollCard.css';

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/uploads';
const PLACEHOLDER_IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><rect width="100%25" height="100%25" fill="%23e2e8f0"/></svg>';

const PollCard = ({ poll }) => {
  const imageSrc = poll.image ? `${UPLOADS_URL}/${poll.image}` : PLACEHOLDER_IMG;

  return (
    <div className="poll-card">
      <Link to={`/polls/${poll._id}`} className="poll-card-image-link">
        <img src={imageSrc} alt={poll.title} className="poll-card-image" />
      </Link>

      <div className="poll-card-body">
        <h3 className="poll-card-title">{poll.title}</h3>
        <p className="poll-card-description">{poll.description}</p>

        <Link to={`/polls/${poll._id}`} className="poll-card-details-link">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default PollCard;