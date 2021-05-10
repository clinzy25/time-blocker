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
        <Link
          className='logout'
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </Link>
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
    padding-right: 30px;
    font-weight: 100;
    color: var(--clr-text-light);
    text-decoration: none;
    margin-right: 5px;
    transition: transform 0.2s;
    text-shadow: 2px 2px 5px #121212;
    :hover {
      transform: scale(1.05);
    }
  }
`;
