import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import loadingGif from '../images/preloader.gif';

/**
 * Handles loading and error states from Auth0
 * @param {component} children 
 * @returns entire app
 */
export const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt='loading' />
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error}</h1>
      </Wrapper>
    );
  }

  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;
