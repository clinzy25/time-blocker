import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { logout } = useAuth0();

  return (
    <Wrapper>
      <h1 className='title'>
        Time Blocker<span className='underscore'>_</span>
      </h1>
      <div className='right-side-items'>
        <h3 className='accessibility'>Accessibility</h3>
        <span
          className='logout'
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  color: var(--clr-text-light);
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 3px;
  .right-side-items {
    display: flex;
    align-items: center;
  }
  .title {
    padding-left: 30px;
    text-shadow: 4px 4px 6px #121212;
    .underscore {
      color: var(--clr-accent);
    }
  }
  .logout,
  .accessibility {
    margin-right: 30px;
    font-weight: 100;
    font-size: 1.2rem;
    color: var(--clr-text-light);
    text-decoration: none;
    text-shadow: 2px 2px 5px #121212;
    :hover {
      color: #5e6fc7;
    }
  }
`;
