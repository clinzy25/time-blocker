import React, { useEffect } from 'react';
import { useTableContext } from '../useReducer/table_context';
import { useAuth0 } from '@auth0/auth0-react';

import { TableContainer } from '../components/TableContainer';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Dashboard = () => {
  const {
    dispatch,
    loading_data,
    loading_user,
    blockInterval,
    blockSize,
    timeRange,
    tableTitle,
    currentTimeOnTop,
    dayColumns,
  } = useTableContext();

  /**
   * @param {object} user - user metadata from Auth0
   */
  const user = useAuth0();

  useEffect(() => {
    if (user.isAuthenticated && !loading_data) {
      const auth0User = user.user;
      dispatch({
        type: 'SET_USER',
        auth0User,
        blockInterval,
        blockSize,
        timeRange,
        tableTitle,
        currentTimeOnTop,
        dayColumns,
      });
      if (!loading_user) {
        dispatch({ type: 'TABLE_DATA', username: user.user.name });
      }
    }
  }, [user, loading_user]);

  return (
    <main>
      <Navbar />
      <TableContainer />
      <Footer />
    </main>
  );
};
