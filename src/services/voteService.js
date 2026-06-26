import api from './api';

export const castVote = (pollId, vote) =>
  api.post('/vote', { pollId, vote }).then((res) => res.data);

export const getResults = (pollId) =>
  api.get(`/results/${pollId}`).then((res) => res.data);
