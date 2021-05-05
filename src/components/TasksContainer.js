import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { DayColumn } from './DayColumn';
import moment from 'moment';

export const TasksContainer = () => {
  const { dayColumns, startTime, currentTime } = useTableContext();
  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  const currentDayIndex =
    daysOfWeek.indexOf(moment(currentTime).format('dddd').toLowerCase()) + 1;

  const getDatesFromCurrentTime = (dayIndex, dayName) => {
    if (dayIndex === currentDayIndex) {
      return moment(startTime).format('l');
    }
    // subtract a number of days in milliseconds from the current day
    return moment(
      startTime - (currentDayIndex - daysOfWeek.indexOf(dayName) - 1) * 86400000
    ).format('l');
  };

  return (
    <Wrapper>
      {dayColumns.map((day, index) => (
        <DayColumn
          date={getDatesFromCurrentTime(index + 1, day.id)}
          key={index}
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
