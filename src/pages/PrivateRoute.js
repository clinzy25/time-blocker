import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * Only display dashboard if user is logged in
 * @param {component} children - Dashboard
 * @returns Dashboard or redirects to login
 */
export const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Route
      {...rest}
      render={() => (isUser ? children : <Redirect to='/login' />)}
    />
  );
};
