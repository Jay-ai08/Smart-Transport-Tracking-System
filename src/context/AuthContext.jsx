import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const STORAGE_KEY = 'gtts_auth_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to parse saved auth user', error);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
