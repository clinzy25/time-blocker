import styled from 'styled-components';
import logo from '../images/CL-logo.png'

export const Footer = () => {
  return (
    <Wrapper>
      <hr />
      <img src={logo} alt='Conner Linzy' />
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  background-color: var(--clr-background-dark2);
  color: var(--clr-text-light);
  hr {
    width: 40%;
    border: 1px solid var(--clr-background-dark);
  }
  img {
    height: 80px;
    width: 80px;
  }
`;
