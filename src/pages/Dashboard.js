import React, { useEffect, dispatch } from 'react';
import { useTableContext } from '../useReducer/table_context';
import { useAuth0 } from '@auth0/auth0-react';

import { TableContainer } from '../components/TableContainer';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Dashboard = () => {
  const { dispatch } = useTableContext();

  /**
   * @param {object} user - get user metadata from Auth0
   */
  const user = useAuth0();

  useEffect(() => {
    if (user.isAuthenticated) {
      dispatch({ type: 'SET_USER', auth0User: user.user });
      dispatch({ type: 'TABLE_SETTINGS', username: user.user.nickname });
    }
  }, [user]);

  return (
    <main>
      <Navbar />
      <TableContainer />
      <Footer />
    </main>
  );
};
