import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VoteButtons from '../components/VoteButtons';
import PollResults from '../components/PollResults';
import UnlockOfferModal from '../components/UnlockOfferModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPollById } from '../services/pollService';
import { castVote } from '../services/voteService';
import '../styles/PollDetails.css';

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/uploads';
const PLACEHOLDER_IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%25" height="100%25" fill="%23e2e8f0"/></svg>';

const PollDetails = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [voting, setVoting] = useState(null);
  const [results, setResults] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      try {
        const res = await getPollById(id);
        setPoll(res.data);
      } catch (err) {
        setError('This poll could not be found.');
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const handleVote = async (vote) => {
    setVoting(vote);
    try {
      const res = await castVote(id, vote);
      setResults(res.data);
      setHasVoted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not record your vote.');
    } finally {
      setVoting(null);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;

  if (error && !poll) {
    return (
      <div className="page-wrapper container text-center">
        <p className="alert alert-error">{error}</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!poll) return null;

  const imageSrc = poll.image ? `${UPLOADS_URL}/${poll.image}` : PLACEHOLDER_IMG;

  return (
    <div className="page-wrapper">
      <div className="container poll-details-grid">
        <div className="poll-details-image-wrap">
          <img src={imageSrc} alt={poll.title} className="poll-details-image" />
        </div>

        <div className="poll-details-info">
          <h1 className="poll-details-title">{poll.title}</h1>
          <p className="poll-details-description">{poll.description}</p>
          <p className="poll-details-question">{poll.question}</p>

          {error && <p className="alert alert-error">{error}</p>}

          {!hasVoted ? (
            <VoteButtons onVote={handleVote} disabled={Boolean(voting)} loadingVote={voting} />
          ) : (
            <>
              <PollResults
                madePercent={results.madePercent}
                fadePercent={results.fadePercent}
                totalVotes={results.totalVotes}
              />
              <button
                type="button"
                className="btn btn-primary btn-block unlock-btn"
                onClick={() => setModalOpen(true)}
              >
                🔓 Unlock Offer
              </button>
            </>
          )}
        </div>
      </div>

      {modalOpen && <UnlockOfferModal pollId={poll._id} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default PollDetails;
