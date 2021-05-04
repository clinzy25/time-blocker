import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import logo from '../images/CL-logo.png';

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <div className='center-wrapper'>
        <h1 className='title'>
          Time Blocker<span className='underscore'>_</span>
        </h1>
        <span className='description'>
          A customizable, web-based solution to the traditional time-block
          planner
        </span>
        <Button
          className='btn'
          variant='contained'
          onClick={loginWithRedirect}
        >
          Login / Sign Up
        </Button>
      </div>
      <img src={logo} alt='' />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  .center-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    color: var(--clr-text-light);
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 3px;
    h1 {
      font-size: 5rem;
    }
    .description {
      font-size: 1.2rem;
      margin-bottom: 200px;
    }
    .underscore {
      color: var(--clr-accent);
    }
  }
  .btn {
    background-color: var(--clr-accent);
    color: var(--clr-text-light);
    transition: transform 0.2s;
    :hover {
      background-color: var(--clr-accent);
      filter: brightness(110%);
      transform: scale(1.05);
    }
    :active {
      transform: translateY(3px)
    }
  }

  img {
    height: 100px;
    width: 100px;
  }
`;
