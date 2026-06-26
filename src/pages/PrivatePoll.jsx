import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VoteButtons from '../components/VoteButtons';
import PollResults from '../components/PollResults';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPrivatePollBySlug, voteOnPrivatePoll } from '../services/privatePollService';
import '../styles/PrivatePoll.css';

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/uploads';
const PLACEHOLDER_IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%25" height="100%25" fill="%23e2e8f0"/></svg>';

const PrivatePoll = () => {
  const { slug } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [voting, setVoting] = useState(null);

  const fetchPoll = async () => {
    try {
      const res = await getPrivatePollBySlug(slug);
      setPoll(res.data);
    } catch (err) {
      setError('This poll could not be found. The link may be invalid.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleVote = async (vote) => {
    setVoting(vote);
    try {
      const res = await voteOnPrivatePoll(slug, vote);
      setPoll((prev) => ({
        ...prev,
        totalVotes: res.data.totalVotes,
        isClosed: res.data.isClosed,
        results: res.data.results,
      }));
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
  const votesRemaining = Math.max(poll.voteLimit - poll.totalVotes, 0);

  return (
    <div className="page-wrapper">
      <div className="container private-poll-container">
        {poll.image && (
          <div className="private-poll-image-wrap">
            <img src={imageSrc} alt={poll.pollName} className="private-poll-image" />
          </div>
        )}

        <h1 className="private-poll-name">{poll.pollName}</h1>
        <p className="private-poll-question">{poll.question}</p>

        {error && <p className="alert alert-error">{error}</p>}

        {poll.isClosed ? (
          <div className="private-poll-closed">
            <p className="private-poll-closed-label">🔒 Voting Closed</p>
            <PollResults
              madePercent={poll.results.madePercent}
              fadePercent={poll.results.fadePercent}
              totalVotes={poll.results.totalVotes}
            />
          </div>
        ) : (
          <>
            <VoteButtons onVote={handleVote} disabled={Boolean(voting)} loadingVote={voting} />
            <p className="private-poll-remaining">
              {votesRemaining} of {poll.voteLimit} votes remaining
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PrivatePoll;
