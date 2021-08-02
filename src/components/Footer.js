import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import logo from '../images/logo.png';

export const Footer = () => {
  return (
    <Wrapper>
      <a href='https://connerlinzy.com/' title='Conner Linzy Profile'>
        <img src={logo} alt='Conner Linzy' />
      </a>
      <a href='https://github.com/clinzy25/time-blocker' title='View On Github'>
        <FaGithub className='github' />
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  background-color: var(--clr-background-dark2);
  color: var(--clr-text-light);
  .github {
    color: var(--clr-text-light);
    height: 40px;
    width: 40px;
  }
  img {
    margin-right: 10px;
    width: 60px;
  }
`;
