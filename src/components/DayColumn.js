import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { FaPlusSquare } from 'react-icons/fa';
import { Task } from './Task';
import { useWindowSize } from '@react-hook/window-size/throttled';

export const DayColumn = ({ day, date }) => {
  const {
    timeColumn,
    addTask,
    getTaskTimeRange,
    blockInterval,
    dayColumns,
  } = useTableContext();

  const [btnKey, setBtnKey] = useState(null);
  const [isAtTop, setIsAtTop] = useState(false);

  const [width, height] = useWindowSize({ fps: 60 });

  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 250) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    });
  }, []);

  return (
    <Wrapper gridInterval={timeColumn.length}>
      <div className='header-container'>
        <div>
          <h2 className={`${isAtTop ? 'sticky' : ''}`}>
            {width < 1400 ? day[0] : day}
          </h2>
          <h5 className='date'>{date}</h5>
        </div>
      </div>
      {timeColumn.map((_, index) => {
        index++;
        const cellKey = day.concat(index);
        return (
          <div
            key={cellKey}
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
                zIndex: `${cellKey === btnKey || width < 1400 ? '1' : '-1'}`,
              }}
              onClick={() => {
                addTask({
                  key: cellKey,
                  dayOfWeek: day,
                  cellNumber: index,
                  timeStart: getTaskTimeRange('start', index),
                  timeEnd: getTaskTimeRange('end', index),
                  initalBlockSize: blockInterval,
                  title: '',
                  description: '',
                });
              }}
            />
            {dayColumns.map((col) => {
              if (col.id === day) {
                return col.tasks.map((task) => {
                  if (task.key === cellKey) {
                    return <Task task={task} />;
                  } else return null;
                });
              } else return null;
            })}
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
    display: flex;
    align-content: center;
    height: 100%;
    width: 100%;
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
    text-align: center;
    top: 0;
    z-index: 2;
    background-color: var(--clr-background-dark2);
    border-bottom: 2px dotted var(--clr-background-dark);
    padding-bottom: 90px;
    width: 100%;
  }
  @media only screen and (min-width: 1550px) {
  }
`;
