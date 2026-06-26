import React, { useState, useEffect } from 'react';
import PollCard from '../components/PollCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPolls } from '../services/pollService';
import { castVote } from '../services/voteService';
import '../styles/Home.css';

const Home = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await getPolls();
        setPolls(res.data);
      } catch (err) {
        setError('Could not load polls. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  const handleQuickVote = async (pollId, vote) => {
    try {
      await castVote(pollId, vote);
      setToast(`Vote recorded: ${vote}! View the poll for full results.`);
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast(err.response?.data?.message || 'Could not record your vote.');
      setTimeout(() => setToast(''), 3000);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="section-title">Made or Fade</h1>
        <p className="section-subtitle">Vote on the latest products — is it Made or is it Fading?</p>

        {toast && <p className="alert alert-success home-toast">{toast}</p>}
        {error && <p className="alert alert-error">{error}</p>}

        {!error && polls.length === 0 && (
          <p className="text-muted">No active polls right now. Check back soon!</p>
        )}

        <div className="poll-grid">
          {polls.map((poll) => (
            <PollCard key={poll._id} poll={poll} onQuickVote={handleQuickVote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
