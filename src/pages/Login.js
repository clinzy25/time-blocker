import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import logo from '../images/CL-logo.png';
import {Link} from 'react-router-dom'

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <div className='center-wrapper'>
        <h1 className='title'>
          Time Blocker<span className='underscore'>_</span>
        </h1>
        <span className='description'>
          A customizable, web-based alternative to the traditional{' '}
          <a className='link' href='https://todoist.com/productivity-methods/time-blocking'>
            time-block planner
          </a>
        </span>
        <Button className='btn' variant='contained' onClick={loginWithRedirect}>
          Login / Sign Up
        </Button>
      </div>
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
    margin: 0 100px;
    h1 {
      font-size: 5rem;
      text-align: center;
      text-shadow: 6px 6px 10px black;
    }
    .description {
      font-size: 1.2rem;
      margin-bottom: 200px;
      text-align: center;
    }
    .underscore {
      color: var(--clr-accent);
    }
    .link {
      color: var(--clr-accent);
      padding-bottom: 1px;
      text-decoration: none;
      border-bottom: 1px solid var(--clr-accent);
    }
  }
  .btn {
    background-color: var(--clr-accent);
    color: var(--clr-text-light);
    transition: transform 0.2s;
    box-shadow: 6px 6px 10px black;
    :hover {
      background-color: var(--clr-accent);
      filter: brightness(110%);
      transform: scale(1.03);
      box-shadow: 8px 8px 15px black;
    }
    :active {
      transform: translateY(3px);
    }
  }
  img {
    height: 100px;
    width: 100px;
    justify-self: flex-end;
  }
`;
