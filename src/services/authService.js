import api from './api';

const TOKEN_KEY = 'mof_admin_token';
const USERNAME_KEY = 'mof_admin_username';

export const login = async (username, password) => {
  const { data } = await api.post('/admin/login', { username, password });
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USERNAME_KEY, data.admin.username);
  return data;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUsername = () => localStorage.getItem(USERNAME_KEY);

export const isAuthenticated = () => Boolean(getToken());
