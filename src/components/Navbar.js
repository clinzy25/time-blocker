import styled from 'styled-components';

export const Navbar = () => {
  return (
    <Wrapper>
      <h1 className='title'>Time Blocker</h1>
      <div className='right-side-items'>
        <h3 className='accessibility'>Accessibility</h3>
        <h3 className='login'>Login</h3>
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
  }
  .title {
    padding-left: 30px;
  }
  .login, .accessibility {
    padding-right: 30px;
    font-weight: 100;
  }
`;
