import styled from 'styled-components';
import { useTableContext } from '../useReducer/table_context';
import { Table } from './Table';
import loadingGif from '../images/preloader.gif';

export const TableContainer = () => {
  const { tableTitle, setTableTitle, loading } = useTableContext();

  return (
    <Wrapper>
      <input
        className='title'
        type='text'
        defaultValue={tableTitle}
        onBlur={(e) => setTableTitle(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.target.blur();
          }
        }}
      />
      {loading ? <img src={loadingGif} alt='loading' /> : <Table />}
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
  img {
    width: 150px;
  }
`;
