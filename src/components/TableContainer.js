import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { Table } from './Table';

export const TableContainer = () => {
  const { tableTitle, setTableTitle } = useTableContext();

  return (
    <Wrapper>
      <input
        className='title'
        type='text'
        defaultValue={tableTitle}
        onChange={(e) => setTableTitle(e.target.value)}
      />
      <Table />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  .title {
    align-self: flex-start;
    width: 80%;
    margin: 40px 0 40px 10%;
    background-color: var(--clr-background-dark);
    outline: none;
    border: 0;
    font-family: 'Oswald', sans-serif;
    font-size: 3rem;
    color: var(--clr-text-light);
    letter-spacing: 8px;
    text-shadow: 4px 4px 6px #121212;
  }
`;
