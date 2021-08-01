import React, { useEffect, dispatch } from 'react';
import { useTableContext } from '../reducers-contexts/table_context';
import { useAuth0 } from '@auth0/auth0-react';

import { TableContainer } from '../components/TableContainer';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Dashboard = () => {
  const { setUser } = useTableContext();

  /**
   * @param {object} user - get user metadata from Auth0
   */
  const user = useAuth0();

  useEffect(() => {
    if (user.isAuthenticated) {
      setUser(user.user);
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
