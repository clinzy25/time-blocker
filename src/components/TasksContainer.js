import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { DayColumn } from './DayColumn';
import moment from 'moment';

export const TasksContainer = () => {
  const { dayColumns, startTime } = useTableContext();

  return (
    <Wrapper>
      {dayColumns.map((day, index) => (
        <DayColumn
          date={moment(startTime + ((index + 1) * 86400000 - 1)).format('l')}
          key={index - 1}
          day={day.id}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 2px;
`;
