import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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
