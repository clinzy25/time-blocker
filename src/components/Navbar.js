import styled from 'styled-components'

export const Navbar = () => {
  return (
    <Wrapper>
      <h1 className='title'>Time Blocker</h1>
      <h3 className='login'>Login</h3>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  color: whitesmoke;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 3px;
  .title {
    padding-left: 30px;
  }
  .login {
    padding-right: 30px;
    font-weight: 100;
  }
`;