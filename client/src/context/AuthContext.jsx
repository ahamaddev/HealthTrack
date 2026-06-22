import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

/**
 * AuthProvider: manages authentication state across the app
 * Provides user, token, login, register, logout, updateProfile
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('healthtrack_token'));
  const [loading, setLoading] = useState(true);

  // On mount: fetch profile if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/profile');
          setUser(res.data.data);
        } catch (err) {
          console.error('Failed to load user:', err);
          localStorage.removeItem('healthtrack_token');
          localStorage.removeItem('healthtrack_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  /**
   * Register a new user
   */
  const register = async (userData) => {
    const res = await API.post('/auth/register', userData);
    const { token: newToken, ...userData2 } = res.data.data;
    localStorage.setItem('healthtrack_token', newToken);
    localStorage.setItem('healthtrack_user', JSON.stringify(userData2));
    setToken(newToken);
    setUser(userData2);
    return res.data;
  };

  /**
   * Login an existing user
   */
  const login = async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    const { token: newToken, ...userData } = res.data.data;
    localStorage.setItem('healthtrack_token', newToken);
    localStorage.setItem('healthtrack_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    return res.data;
  };

  /**
   * Logout user
   */
  const logout = () => {
    localStorage.removeItem('healthtrack_token');
    localStorage.removeItem('healthtrack_user');
    setToken(null);
    setUser(null);
  };

  /**
   * Update user profile
   */
  const updateProfile = async (profileData) => {
    const res = await API.put('/auth/profile', profileData);
    const updatedUser = res.data.data;
    localStorage.setItem('healthtrack_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return res.data;
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    register,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
