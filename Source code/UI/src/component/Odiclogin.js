// HomePage.js
import React from 'react';
import { useAuth } from './AuthContext';

const Odiclogin = () => {
  const { signinRedirect } = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={signinRedirect}>Login</button>
    </div>
  );
};

export default Odiclogin;
