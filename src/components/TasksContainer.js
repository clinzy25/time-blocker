import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { DayColumn } from './DayColumn';
import moment from 'moment';
import { TimeColumn } from './TimeColumn';
import { useWindowSize } from '@react-hook/window-size/throttled';

/**
 * @returns DayColumns
 */
export const TasksContainer = () => {
  const { dayColumns, startTime, currentTime } = useTableContext();
  const [width] = useWindowSize({ fps: 60 });

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

  /**
   * Desktop - return all dayColumns and one TimeColumn 
   * (TimeColumn in Table.js)
   * Mobile - return one TimeColumn per DayColumn
   */
  return width >= 1100 ? (
    <WrapperDesktop>
      {dayColumns.map((column, index) => (
        <DayColumn
          key={index}
          date={getDatesFromCurrentTime(index + 1, column.id)}
          columnDay={column.id}
        />
      ))}
    </WrapperDesktop>
  ) : (
    dayColumns.map((column, index) => (
      <WrapperMobile>
        <TimeColumn />
        <DayColumn
          key={index}
          date={getDatesFromCurrentTime(index + 1, column.id)}
          columnDay={column.id}
        />
      </WrapperMobile>
    ))
  );
};

  /** Desktop view */
const WrapperDesktop = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
`;

/** Mobile view */
const WrapperMobile = styled.article`
  display: grid;
  grid-template-columns: 40px 1fr;
`;
