import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

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
    margin: 0 30px 0 0;
    font-weight: 100;
    font-size: 1.2rem;
    color: var(--clr-text-light);
    text-decoration: none;
    text-shadow: 2px 2px 5px #121212;
    cursor: pointer;
    :hover {
      color: #5e6fc7;
    }
  }
  @media only screen and (max-width: 800px) {
    height: 90px;
    .title {
      font-size: 1.5rem;
      margin-right: 10px;
    }
    .right-side-items {
      height: 100%;
      flex-flow: column-reverse;
      justify-content: space-around;
      align-items: flex-end;
    }
    .logout,
    .accessibility {
      font-weight: 100;
      font-size: 0.9rem;
    }
  }
`;
