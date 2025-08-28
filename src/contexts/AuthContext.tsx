import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  occupation: string;
  age: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  occupation: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  // Set up axios interceptor for token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user profile on mount if token exists
  useEffect(() => {
    if (token && !user) {
      loadUserProfile();
    }
  }, [token]);

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/profile');
      const userData = response.data;
      setUser({
        ...userData,
        age: calculateAge(userData.dateOfBirth)
      });
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // If profile fetch fails, clear invalid token
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setUser({
        ...userData,
        age: calculateAge(userData.dateOfBirth)
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/register', userData);
      const { token: newToken, user: newUser } = response.data;
      
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setUser({
        ...newUser,
        age: calculateAge(newUser.dateOfBirth)
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};