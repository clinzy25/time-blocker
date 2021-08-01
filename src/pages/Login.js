import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <h1 className='title'>
        Time Blocker<span className='underscore'>_</span>
      </h1>
      <p className='description'>
        A customizable, web-based alternative to the traditional&nbsp;
        <a
          className='link'
          href='https://todoist.com/productivity-methods/time-blocking'
        >
          time-block planner
        </a>
      </p>
      <Button className='btn' variant='contained' onClick={loginWithRedirect}>
        Login / Sign Up
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin: 0 25px;
  font-family: 'Montserrat', sans-serif;
  color: var(--clr-text-light);
  letter-spacing: 3px;
  h1 {
    font-size: 5rem;
    text-align: center;
    text-shadow: 6px 6px 10px #121212;
  }
  .description {
    font-size: 1.2rem;
    margin-bottom: 200px;
    text-align: center;
  }
  .underscore,
  .link {
    color: var(--clr-accent);
  }
  .link {
    padding-bottom: 1px;
    text-decoration: none;
    border-bottom: 1px solid var(--clr-accent);
    :hover {
      color: var(--clr-text-light);
    }
  }
  .btn {
    color: var(--clr-text-light);
    background-color: var(--clr-accent);
    transition: transform 0.2s;
    box-shadow: 6px 6px 10px #121212;
    :hover {
      background-color: var(--clr-accent);
      filter: brightness(110%);
      transform: scale(1.03);
      box-shadow: 8px 8px 15px #121212;
    }
    :active {
      transform: translateY(3px);
    }
  }
`;
