// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import userManager from './authConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    userManager.getUser().then(user => {
      console.log('User loaded:', user);
      setUser(user);
    });
    userManager.events.addUserLoaded(user => {
      console.log('User loaded via event:', user);
      setUser(user);
    });
    userManager.events.addUserUnloaded(() => {
      console.log('User unloaded');
      setUser(null);
    });
  }, []);

  const signinRedirect = () => {
    console.log('Sign-in redirect called');
    userManager.signinRedirect();
  };

  const signoutRedirect = () => {
    console.log('Sign-out redirect called');
    userManager.signoutRedirect();
  };

  return (
    <AuthContext.Provider value={{ user, signinRedirect, signoutRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('useAuth called:', context);
  return context;
};
