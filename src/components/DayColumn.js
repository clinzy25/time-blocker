import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { FaPlusSquare } from 'react-icons/fa';
import { FaMinusSquare } from 'react-icons/fa';
import { Task } from './Task';

export const DayColumn = ({ day }) => {
  const {
    timeColumn,
    addTask,
    getTaskTimeRange,
    blockInterval,
    dayColumns,
  } = useTableContext();

  const [showBtn, setShowBtn] = useState(false);
  const [btnKey, setBtnKey] = useState(null);
  const [isAtTop, setIsAtTop] = useState(false);


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
      <h2 className={`${isAtTop ? 'sticky' : ''}`}>{day}</h2>
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
              setShowBtn(true);
            }}
            onMouseLeave={() => {
              setBtnKey(null);
              setShowBtn(false);
            }}
          >
            {/* {cellKey} */}
            {showBtn && cellKey === btnKey && (
              <FaPlusSquare
                className='add-task-btn'
                onClick={() => {
                  addTask({
                    key: cellKey,
                    dayOfWeek: day,
                    cellNumber: index,
                    timeStart: getTaskTimeRange('start', index),
                    timeEnd: getTaskTimeRange('end', index),
                    initalBlockSize: blockInterval,
                    title: '',
                    textContent: '',
                  });
                  setShowBtn(false);
                }}
              />
            )}
            {Object.values(dayColumns).map((col) => {
              if (col.id === day && col.tasks.length > 0) {
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
  :hover {
    border-left: 2px dotted var(--clr-background-dark);
  }
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
    display: flex;
    align-content: center;
    height: 100%;
    width: 100%;
    border-top: 2px dotted var(--clr-background-dark);
  }
  .add-task-btn {
    justify-self: flex-end;
    height: 40px;
    width: 40px;
    margin: 10px 0 0 5px;
    color: var(--clr-accent);
    cursor: pointer;
    position: absolute;
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
`;

// const getTasks = (cellKey) => {
//   return (
//     tasks &&
//     tasks.map((task) => {
//       if (task.key === cellKey) {
//         return <Task task={task} />;
//       } else {
//         return null;
//       }
//     })
//   );
// };
