import React, { useState } from 'react';
import CopyButton from '../components/CopyButton';
import { createPrivatePoll } from '../services/privatePollService';
import '../styles/CreatePrivatePoll.css';

const CreatePrivatePoll = () => {
  const [pollName, setPollName] = useState('');
  const [question, setQuestion] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('pollName', pollName);
      formData.append('question', question);
      if (imageFile) formData.append('image', imageFile);

      const res = await createPrivatePoll(formData);
      const fullUrl = `${window.location.origin}${res.data.shareUrl}`;
      setGeneratedUrl(fullUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your poll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPollName('');
    setQuestion('');
    setImageFile(null);
    setGeneratedUrl('');
    setError('');
  };

  return (
    <div className="page-wrapper">
      <div className="container create-poll-container">
        <h1 className="section-title">Create a Private Poll</h1>
        <p className="section-subtitle">
          No login needed. Share the link with friends and see what they think — Made or Fade?
        </p>

        {!generatedUrl ? (
          <form className="create-poll-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="pollName">Poll Name</label>
              <input
                id="pollName"
                value={pollName}
                onChange={(e) => setPollName(e.target.value)}
                placeholder="e.g. New Sneaker Drop"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="question">Poll Question</label>
              <input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Worth the hype?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image (optional)</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            {error && <p className="alert alert-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Poll'}
            </button>
          </form>
        ) : (
          <div className="generated-link-box">
            <p className="generated-link-label">Your poll is ready! Share this link with friends:</p>
            <div className="generated-link-row">
              <input type="text" readOnly value={generatedUrl} className="generated-link-input" />
              <CopyButton text={generatedUrl} label="Copy Link" />
            </div>
            <button type="button" className="btn btn-outline" onClick={handleReset}>
              Create Another Poll
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePrivatePoll;
