import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getEmailCaptures } from '../services/pollService';
import '../styles/EmailCaptures.css';

const EmailCaptures = () => {
  const [captures, setCaptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCaptures = async () => {
      try {
        const res = await getEmailCaptures();
        setCaptures(res.data);
      } catch (err) {
        setError('Could not load email captures.');
      } finally {
        setLoading(false);
      }
    };
    fetchCaptures();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="admin-page-title">Email Captures</h1>
      <p className="admin-page-subtitle">Emails collected from visitors unlocking discount offers.</p>

      {error && <p className="alert alert-error">{error}</p>}

      <div className="polls-table-wrap">
        <table className="polls-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Poll Name</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {captures.map((capture) => (
              <tr key={capture.id}>
                <td>{capture.email}</td>
                <td>{capture.pollName}</td>
                <td>{new Date(capture.dateSubmitted).toLocaleString()}</td>
              </tr>
            ))}
            {captures.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No emails collected yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailCaptures;
