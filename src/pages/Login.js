import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const [language, setLanguage] = useState('en');

  const localization = {
    en: {
      description: 'A customizable, web-based alternative to the traditional ',
      link: 'time-block planner.',
      btn: 'Login / Signup',
    },
    es: {
      description:
        'Una alternativa personalizable basada en la web a la tradicional ',
      link: 'planificador de bloque de tiempo.',
      btn: 'Iniciar sesión / Registrarse',
    },
  };

  return (
    <Wrapper>
      <h1 className='title'>
        Time Blocker<span className='underscore'>_</span>
      </h1>
      <p className='description'>
        {localization[language].description}
        <a
          className='link'
          href='https://todoist.com/productivity-methods/time-blocking'
        >
          {localization[language].link}
        </a>
      </p>
      <Button className='btn' variant='contained' onClick={loginWithRedirect}>
        {localization[language].btn}
      </Button>
      <div className='language'>
        <Button className='btn' onClick={() => setLanguage('en')} type='button'>
          English
        </Button>
        <Button className='btn' onClick={() => setLanguage('es')} type='button'>
          Spanish
        </Button>
      </div>
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
    margin: 10px;
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
  .language {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 20px;
  }
`;
