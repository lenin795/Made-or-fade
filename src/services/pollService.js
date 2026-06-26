import api from './api';

// Public
export const getPolls = () => api.get('/polls').then((res) => res.data);

export const getPollById = (id) => api.get(`/polls/${id}`).then((res) => res.data);

// Admin
export const getAllPollsAdmin = () => api.get('/admin/polls').then((res) => res.data);

export const createPoll = (formData) =>
  api
    .post('/polls', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data);

export const updatePoll = (id, formData) =>
  api
    .put(`/polls/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data);

export const deletePoll = (id) => api.delete(`/polls/${id}`).then((res) => res.data);

export const getDashboardStats = () => api.get('/admin/dashboard').then((res) => res.data);

export const getEmailCaptures = () => api.get('/admin/email-captures').then((res) => res.data);
