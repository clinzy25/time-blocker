import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <Wrapper>
      <a className='cl' href='https://connerlinzy.com/' title='Author'>
        CL
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
  .cl {
    color: var(--clr-text-light);
    font-size: 2.3rem;
    text-decoration: none;
    padding-right: 20px;
    letter-spacing: 5px;
  }
`;
