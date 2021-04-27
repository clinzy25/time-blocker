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
  background-color: #353535;
  color: whitesmoke;
  hr {
    width: 40%;
    border: 1px solid #252525;
  }
`;
