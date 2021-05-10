import React, { useState } from 'react';
import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { Task } from './Task';
import { FaPlusSquare } from 'react-icons/fa';
import { useWindowSize } from '@react-hook/window-size/throttled';
import useScrollPosition from '@react-hook/window-scroll';
import moment from 'moment';

/**
 *
 * @param {string} columnDay - day of week of DayColumn
 * @param {string} date - formatted date to display under header
 * @returns column header, empty task slots or tasks, if available
 */
export const DayColumn = ({ columnDay, date }) => {
  const {
    timeColumn,
    addTask,
    blockInterval,
    dayColumns,
    currentTime,
  } = useTableContext();

  /** For button hover effect */
  const [btnKey, setBtnKey] = useState(null);

  const [width] = useWindowSize({ fps: 60 });
  /** Used to determine if column headers on top for sticky positioning */
  const scrollY = useScrollPosition(60 /*fps*/);

  /**
   * Get tasks from dayColumns state value
   * @param {number} cellTime - Cell time in ms where task was created
   * @param {number} index - Index of task in task array
   * @returns A task
   */
  const getTasks = (cellTime, index) => {
    return dayColumns.map(
      (column) =>
        column.id === columnDay &&
        column.tasks.map((task) => {
          if (task.timeStart === cellTime) {
            return <Task task={task} />;
          }
          /**
           * If task time is within one blockInterval of current cellTime
           * I.e. - a 7:30 task will display in a 7:00 - 8:00 cell
           */
          if (
            task.timeStart > cellTime &&
            task.timeStart < timeColumn[index + 1] - blockInterval * 60000
          ) {
            return <Task task={task} />;
          }
        })
    );
  };

  return (
    <Wrapper
      date={date}
      currentTime={currentTime}
      gridInterval={timeColumn.length}
    >
      {/* Column Header */}
      <header className={`header-container ${scrollY > 300 ? 'sticky' : ''}`}>
        <div>
          <h2>{width < 1400 ? columnDay[0] : columnDay}</h2>
          <h5 className='date'>{date}</h5>
        </div>
      </header>

      {/* Task Cells */}
      {timeColumn.map((_, index) => {
        index++;
        const cellTime = timeColumn[index] - blockInterval * 60000;
        return (
          <section
            key={columnDay.concat(index)}
            className='task-slot'
            onMouseEnter={() => {
              setBtnKey(cellTime);
            }}
            onMouseLeave={() => {
              setBtnKey(null);
            }}
          >
            <FaPlusSquare
              className='add-task-btn'
              /** Hide add task btn until user hovers over */
              style={{
                opacity: `${cellTime === btnKey || width < 1400 ? '1' : '0'}`,
              }}
              onClick={() => {
                addTask({
                  key: cellTime,
                  dayOfWeek: columnDay,
                  date: date,
                  timeStart: cellTime,
                  timeEnd: cellTime + blockInterval * 60000,
                  initalBlockSize: blockInterval,
                  title: '',
                  description: '',
                });
              }}
            />

            {/* Search for task with same cellTime as the current cell and display it */}
            {getTasks(cellTime, index)}
          </section>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${(props) => `100px repeat(${props.gridInterval}, 1fr)`};
  border-radius: 5px;
  min-width: 100px;
  z-index: 0;
  border-left: 2px dotted var(--clr-background-dark2);
  /** Background of current day of week will be different */
  background-color: ${(props) =>
    props.date === moment(props.currentTime).format('l') &&
    'var(--clr-background-dark3)'};
  :hover {
    border-left: 2px dotted var(--clr-background-dark);
  }
  .header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  h2,
  .date {
    margin: 0;
    color: var(--clr-text-light);
  }
  h2 {
    font-family: 'Oswald', sans-serif;
    letter-spacing: 4px;
    font-size: 2rem;
    font-weight: 200;
    text-transform: capitalize;
  }
  .date {
    letter-spacing: 2px;
    font-weight: 400;
    font-size: 0.9rem;
  }
  .task-slot {
    z-index: 1;
    border-top: 2px dotted var(--clr-background-dark);
    :hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .add-task-btn {
    height: 40px;
    width: 40px;
    margin: 10px 0 0 10px;
    color: var(--clr-accent);
    cursor: pointer;
    position: absolute;
    z-index: -1;
    :hover {
      filter: brightness(130%);
    }
  }
  .sticky {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: var(--clr-background-dark2);
    border-bottom: 2px dotted var(--clr-background-dark);
  }
`;
