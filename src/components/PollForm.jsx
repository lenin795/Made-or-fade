import React, { useState, useEffect } from 'react';
import '../styles/ManagePolls.css';

const emptyForm = {
  title: '',
  description: '',
  question: '',
  discountCode: '',
  shopUrl: '',
  isActive: true,
};

const PollForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        question: initialData.question || '',
        discountCode: initialData.discountCode || '',
        shopUrl: initialData.shopUrl || '',
        isActive: initialData.isActive,
      });
    } else {
      setForm(emptyForm);
    }
    setImageFile(null);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append('image', imageFile);
    onSubmit(formData);
  };

  return (
    <form className="poll-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="description">Short Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="question">Poll Question</label>
        <input id="question" name="question" value={form.question} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="discountCode">Discount Code</label>
          <input
            id="discountCode"
            name="discountCode"
            value={form.discountCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shopUrl">Shop URL</label>
          <input
            id="shopUrl"
            name="shopUrl"
            type="url"
            placeholder="https://..."
            value={form.shopUrl}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">Product Image {initialData && '(leave blank to keep current)'}</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <div className="form-group form-checkbox">
        <label htmlFor="isActive">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={handleChange}
          />
          Poll is Active
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update Poll' : 'Create Poll'}
        </button>
      </div>
    </form>
  );
};

export default PollForm;
