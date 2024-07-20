// Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userManager from './authConfig';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    userManager.signinRedirectCallback()
      .then(user => {
        debugger
        // 'user' object typically contains information about the authenticated user
        console.log('User information:', user);
        // Redirect to '/protected' route or perform any necessary actions
        navigate('/protected');
      })
      .catch(error => {
        console.error('Error handling callback:', error);
        // Handle error appropriately (e.g., show error message)
      });
  }, [navigate]);
  
  return <div>Loading...</div>;
};

export default Callback;
