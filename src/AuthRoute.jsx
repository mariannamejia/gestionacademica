import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Componente para proteger rutas
const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" /> // Redirect to the login page if not authenticated
      )
    }
  />
);

export default AuthRoute;
