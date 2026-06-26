import React, { useState, useEffect } from 'react';
import PollForm from '../components/PollForm';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  getAllPollsAdmin,
  createPoll,
  updatePoll,
  deletePoll,
} from '../services/pollService';
import '../styles/ManagePolls.css';

const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/uploads';

const ManagePolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPoll, setEditingPoll] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const res = await getAllPollsAdmin();
      setPolls(res.data);
    } catch (err) {
      setError('Could not load polls.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleCreateClick = () => {
    setEditingPoll(null);
    setShowForm(true);
  };

  const handleEditClick = (poll) => {
    setEditingPoll(poll);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPoll(null);
  };

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');
    try {
      if (editingPoll) {
        await updatePoll(editingPoll._id, formData);
      } else {
        await createPoll(formData);
      }
      setShowForm(false);
      setEditingPoll(null);
      fetchPolls();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save poll.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (poll) => {
    if (!window.confirm(`Delete "${poll.title}"? This cannot be undone.`)) return;
    try {
      await deletePoll(poll._id);
      fetchPolls();
    } catch (err) {
      setError('Could not delete poll.');
    }
  };

  const handleToggleActive = async (poll) => {
    try {
      const formData = new FormData();
      formData.append('isActive', !poll.isActive);
      await updatePoll(poll._id, formData);
      fetchPolls();
    } catch (err) {
      setError('Could not update poll status.');
    }
  };

  return (
    <div>
      <div className="manage-polls-header">
        <div>
          <h1 className="admin-page-title">Manage Polls</h1>
          <p className="admin-page-subtitle">Create, edit, and manage your public polls.</p>
        </div>
        {!showForm && (
          <button type="button" className="btn btn-primary" onClick={handleCreateClick}>
            + Create Poll
          </button>
        )}
      </div>

      {error && <p className="alert alert-error">{error}</p>}

      {showForm && (
        <div className="poll-form-wrap">
          <h2 className="poll-form-heading">{editingPoll ? 'Edit Poll' : 'New Poll'}</h2>
          <PollForm
            initialData={editingPoll}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
          />
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="polls-table-wrap">
          <table className="polls-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Status</th>
                <th>Discount Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {polls.map((poll) => (
                <tr key={poll._id}>
                  <td>
                    {poll.image ? (
                      <img
                        src={`${UPLOADS_URL}/${poll.image}`}
                        alt={poll.title}
                        className="polls-table-thumb"
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}
                  </td>
                  <td>{poll.title}</td>
                  <td>
                    <span className={`status-badge ${poll.isActive ? 'status-active' : 'status-inactive'}`}>
                      {poll.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{poll.discountCode}</td>
                  <td className="polls-table-actions">
                    <button type="button" className="btn-link" onClick={() => handleEditClick(poll)}>
                      Edit
                    </button>
                    <button type="button" className="btn-link" onClick={() => handleToggleActive(poll)}>
                      {poll.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      type="button"
                      className="btn-link btn-link-danger"
                      onClick={() => handleDelete(poll)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {polls.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No polls created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagePolls;
