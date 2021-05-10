import React, { useState } from 'react';
import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { Task } from './Task';
import { FaPlusSquare } from 'react-icons/fa';
import { useWindowSize } from '@react-hook/window-size/throttled';
import useScrollPosition from '@react-hook/window-scroll';
import moment from 'moment';

export const DayColumn = ({ day, date }) => {
  const {
    timeColumn,
    addTask,
    blockInterval,
    dayColumns,
    currentTime,
  } = useTableContext();

  const [btnKey, setBtnKey] = useState(null);

  const [width] = useWindowSize({ fps: 60 });
  const scrollY = useScrollPosition(60 /*fps*/);

  return (
    <Wrapper
      date={date}
      currentTime={currentTime}
      gridInterval={timeColumn.length}
    >
      <div className={`header-container ${scrollY > 300 ? 'sticky' : ''}`}>
        <div>
          <h2>{width < 1400 ? day[0] : day}</h2>
          <h5 className='date'>{date}</h5>
        </div>
      </div>
      {timeColumn.map((_, index) => {
        index++;
        const cellKey = day.concat(index);
        const cellTime = timeColumn[index] - blockInterval * 60000;
        return (
          <div
            key={cellKey}
            time={cellTime}
            className='task-slot'
            style={{ gridArea: `2 / 1 / ${index + 2} / 2;` }}
            onMouseEnter={() => {
              setBtnKey(cellKey);
            }}
            onMouseLeave={() => {
              setBtnKey(null);
            }}
          >
            <FaPlusSquare
              className='add-task-btn'
              style={{
                opacity: `${cellKey === btnKey || width < 1400 ? '1' : '0'}`,
              }}
              onClick={() => {
                addTask({
                  key: cellKey,
                  dayOfWeek: day,
                  date: date,
                  cellNumber: index,
                  timeStart: cellTime,
                  timeEnd: cellTime + blockInterval * 60000,
                  initalBlockSize: blockInterval,
                  title: '',
                  description: '',
                });
              }}
            />
            {dayColumns.map(
              (column) =>
                column.id === day &&
                column.tasks.map((task) => {
                  if (task.timeStart === cellTime) {
                    return <Task task={task} />;
                  }
                  if (
                    task.timeStart > cellTime &&
                    task.timeStart <
                      timeColumn[index + 1] - blockInterval * 60000
                  ) {
                    return <Task task={task} />;
                  }
                })
            )}
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
  border-radius: 5px;
  min-width: 100px;
  border-left: 2px dotted var(--clr-background-dark2);
  z-index: 0;
  background-color: ${(props) =>
    props.date === moment(props.currentTime).format('l')
      ? 'var(--clr-background-dark3)'
      : null};
  :hover {
    border-left: 2px dotted var(--clr-background-dark);
  }
  .header-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    font-family: 'Oswald', sans-serif;
    letter-spacing: 4px;
    font-size: 2rem;
    font-weight: 200;
    color: var(--clr-text-light);
    text-transform: capitalize;
    margin: 0;
  }
  .date {
    color: var(--clr-text-light);
    letter-spacing: 2px;
    font-weight: 400;
    font-size: 0.9rem;
    margin: 0;
  }
  .task-slot {
    height: 100%;
    width: 100%;
    z-index: 1;
    border-top: 2px dotted var(--clr-background-dark);
    :hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .add-task-btn {
    height: 40px;
    width: 40px;
    margin: 10px 0 0 5px;
    color: var(--clr-accent);
    cursor: pointer;
    // must be absolute
    position: absolute;
    z-index: -1;
  }
  .sticky {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: var(--clr-background-dark2);
    border-bottom: 2px dotted var(--clr-background-dark);
    width: 100%;
  }
  @media only screen and (min-width: 1550px) {
  }
`;
