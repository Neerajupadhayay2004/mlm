import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../mock/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('mlm_user');
    const savedIsAdmin = localStorage.getItem('mlm_isAdmin');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAdmin(savedIsAdmin === 'true');
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login validation
      if (email === 'admin@mlm.com' && password === 'admin123') {
        const adminUser = { 
          id: 'admin', 
          email: 'admin@mlm.com', 
          fullName: 'Admin User',
          username: 'admin',
          isAdmin: true 
        };
        setUser(adminUser);
        setIsAdmin(true);
        localStorage.setItem('mlm_user', JSON.stringify(adminUser));
        localStorage.setItem('mlm_isAdmin', 'true');
        return { success: true, isAdmin: true };
      }
      
      // Regular user login
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password123') {
        setUser(foundUser);
        setIsAdmin(false);
        localStorage.setItem('mlm_user', JSON.stringify(foundUser));
        localStorage.setItem('mlm_isAdmin', 'false');
        return { success: true, isAdmin: false };
      }
      
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration
      const newUser = {
        id: `user_${Date.now()}`,
        ...userData,
        joinDate: new Date().toISOString().split('T')[0],
        isActive: true,
        rank: 'Bronze',
        totalEarnings: 0,
        currentBalance: 0,
        totalWithdrawn: 0,
        directReferrals: 0,
        totalTeamSize: 0,
        referralLink: `https://mlm-system.com/ref/${userData.username}`
      };
      
      // Add to mock users (in real app, this would be API call)
      mockUsers.push(newUser);
      
      setUser(newUser);
      setIsAdmin(false);
      localStorage.setItem('mlm_user', JSON.stringify(newUser));
      localStorage.setItem('mlm_isAdmin', 'false');
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('mlm_user');
    localStorage.removeItem('mlm_isAdmin');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('mlm_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
