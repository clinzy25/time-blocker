import React, { useState, } from 'react';
import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { FaPlusSquare } from 'react-icons/fa';
import { Task } from './Task';

export const DayColumn = ({ day }) => {
  const { timeColumn, addTask, tasks } = useTableContext();

  const [showBtn, setShowBtn] = useState(false);
  const [btnKey, setBtnKey] = useState(null);

  const getTasks = (cellKey) => {
    return tasks
      ? tasks.map((task) => {
          if (task.key === cellKey) {
            return <Task cellKey={cellKey} />;
          }
        })
      : null;
  };

  return (
    <Wrapper gridInterval={timeColumn.length}>
      <h2>{day}</h2>
      {timeColumn.map((_, index) => {
        index++;
        const cellKey = day.substr(0, 2).concat(index);
        let hasTask = false;
        return (
          <div
            key={cellKey}
            className='task-slot'
            style={{ gridArea: `${2} / 1 / ${index + 2} / 2;` }}
            onMouseEnter={() => {
              setBtnKey(index);
              if (!hasTask) {
                setShowBtn(true);
              }
            }}
            onMouseLeave={() => {
              setBtnKey(null);
              setShowBtn(false);
            }}
          >
            {showBtn && !hasTask && index === btnKey ? (
              <FaPlusSquare
                className='add-task-btn'
                onClick={() => {
                  addTask({
                    key: cellKey,
                    dayOfWeek: day,
                    time: '',
                    title: 'New Task',
                    textContent: '',
                  });
                  setShowBtn(false);
                }}
              />
            ) : null}
            {getTasks(cellKey)}
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
    display: flex;
    align-content: center;
    height: 100%;
    width: 100%;
    border-top: 2px dotted var(--clr-background-dark);
    :hover {
      display: block;
    }
  }
  .add-task-btn {
    height: 25px;
    width: 25px;
    margin: 10px 0 0 5px;
    color: var(--clr-background-dark);
    cursor: pointer;
  }
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
`;
