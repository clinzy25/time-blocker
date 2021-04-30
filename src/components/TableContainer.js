import styled from 'styled-components';
import { Table } from './Table';


export const TableContainer = () => {
  return (
    <Wrapper>
      <input className='title' type='text' placeholder='TASKS' />
      <Table />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  .title {
    background-color: var(--clr-background-dark);
    width: 80%;
    outline: none;
    border: 0;
    font-family: 'Oswald', sans-serif;
    align-self: flex-start;
    margin: 40px 0 40px 100px;
    font-size: 3rem;
    color: var(--clr-text-light);
    letter-spacing: 8px;
    ::placeholder {
      color: var(--clr-text-light);
    }
  }
`;
