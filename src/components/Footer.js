import styled from 'styled-components';

export const Footer = () => {
  return (
    <Wrapper>
      <hr />
      <h2>Logo</h2>
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
`;
