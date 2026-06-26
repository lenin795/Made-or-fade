import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

// Small hook that wraps authService with React state + navigation,
// so admin pages can react to login/logout without reading localStorage directly.
const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [username, setUsername] = useState(authService.getUsername());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (user, pass) => {
      setLoading(true);
      setError('');
      try {
        const data = await authService.login(user, pass);
        setIsAuthenticated(true);
        setUsername(data.admin.username);
        navigate('/admin/dashboard');
        return true;
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setUsername(null);
    navigate('/admin/login');
  }, [navigate]);

  return { isAuthenticated, username, error, loading, login, logout };
};

export default useAuth;
