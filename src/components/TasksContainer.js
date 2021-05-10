import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { DayColumn } from './DayColumn';
import moment from 'moment';

/**
 * @returns DayColumns
 */
export const TasksContainer = () => {
  const { dayColumns, startTime, currentTime } = useTableContext();

  const daysOfWeek = dayColumns.map((column) => column.id);

  const currentDayIndex =
    daysOfWeek.indexOf(moment(currentTime).format('dddd').toLowerCase()) + 1;

  /**
   * Current day of week will show today's date, and all previous and subsequent dates
   * are derived from it.
   * @param {number} dayIndex
   * @param {string} dayName
   * @returns date for column header
   */
  const getDatesFromCurrentTime = (dayIndex, dayName) => {
    if (dayIndex === currentDayIndex) {
      return moment(startTime).format('l');
    }
    /** Subtract difference of day in milliseconds from the current day */
    return moment(
      startTime - (currentDayIndex - daysOfWeek.indexOf(dayName) - 1) * 86400000
    ).format('l');
  };

  return (
    <Wrapper>
      {dayColumns.map((column, index) => (
        <DayColumn
          key={index}
          date={getDatesFromCurrentTime(index + 1, column.id)}
          columnDay={column.id}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /** Mobile view */
  width: 100%;

  /** Desktop view */
  @media only screen and (min-width: 1100px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1px;
  }
`;
