import styled from 'styled-components';
import { Table } from './Table';

export const TableContainer = () => {
  return (
    <Wrapper>
      <input className='title' type='text' placeHolder='DASH' />
      <Table />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  .title {
    background-color: #252525;
    width: 80%;
    outline: none;
    border: 0;
    font-family: 'Oswald', sans-serif;
    align-self: flex-start;
    margin: 40px 0 40px 100px;
    font-size: 3rem;
    color: whitesmoke;
    letter-spacing: 8px;
    ::placeholder {
      color: whitesmoke;
    }
  }
`;
