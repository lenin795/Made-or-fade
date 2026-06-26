import api from './api';

export const unlockOffer = (email, pollId) =>
  api.post('/unlock-offer', { email, pollId }).then((res) => res.data);
