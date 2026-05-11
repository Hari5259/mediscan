import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mediscan_user');
    const token = localStorage.getItem('mediscan_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    try {
      const response = await api.post('/auth/login', { email, password, userType });
      
      if (response.success) {
        const { token, refreshToken, ...userData } = response.data;
        
        // Persist session
        localStorage.setItem('mediscan_token', token);
        localStorage.setItem('mediscan_refresh_token', refreshToken);
        localStorage.setItem('mediscan_user', JSON.stringify(userData));
        
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (formData) => {
    try {
      const response = await api.post('/auth/register', formData);
      
      if (response.success) {
        const { token, refreshToken, ...userData } = response.data;
        
        // Persist session
        localStorage.setItem('mediscan_token', token);
        localStorage.setItem('mediscan_refresh_token', refreshToken);
        localStorage.setItem('mediscan_user', JSON.stringify(userData));
        
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: response.message || 'Registration failed' };
    } catch (error) {
      console.error('Registration Catch:', error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('mediscan_token');
    localStorage.removeItem('mediscan_refresh_token');
    localStorage.removeItem('mediscan_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
