import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { DayColumn } from './DayColumn';

export const TasksContainer = () => {
  const { dayOrder } = useTableContext();

  return (
    <Wrapper>
      {dayOrder.map((day, index) => {
        return <DayColumn key={day} day={day} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 8px 8px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 2px;
`;
