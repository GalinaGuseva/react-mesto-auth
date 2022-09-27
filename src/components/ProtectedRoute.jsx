import React from 'react';
import {Redirect} from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Redirect to="/signin"/>  
}

export default ProtectedRoute;
