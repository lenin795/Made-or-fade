import api from './api';

export const createPrivatePoll = (formData) =>
  api
    .post('/private-polls', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data);

export const getPrivatePollBySlug = (slug) =>
  api.get(`/private-polls/${slug}`).then((res) => res.data);

export const voteOnPrivatePoll = (slug, vote) =>
  api.post('/private-polls/vote', { slug, vote }).then((res) => res.data);
