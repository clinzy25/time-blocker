import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { FaPlusSquare } from 'react-icons/fa';

export const DayColumn = ({ day }) => {
  const { timeColumn } = useTableContext();

  return (
    <Wrapper gridInterval={timeColumn.length}>
      <h2>{day}</h2>
      {timeColumn.map((_, index) => {
        index++;
        return (
          <div
            key={index}
            className='task-slot'
            style={{ gridArea: `${2} / 1 / ${index + 2} / 2;` }}
          >
            <FaPlusSquare className='add-task-btn' />
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${(props) => `100px repeat(${props.gridInterval}, 1fr);`};
  grid-gap: 3px;
  background-color: var(--clr-background-dark3);
  border-radius: 7px;
  h2 {
    justify-self: center;
    font-family: 'Oswald', sans-serif;
    letter-spacing: 4px;
    font-size: 2rem;
    font-weight: 200;
    color: var(--clr-text-light);
    text-transform: capitalize;
  }
  .task-slot {
    height: 100%;
    width: 100%;
    border-bottom: 2px solid var(--clr-background-dark2);
  }
  .add-task-btn {
    height: 20px;
    width: 20px;
    margin: 5px;
    color: var(--clr-background-dark);
    display: none;
  }
`;
