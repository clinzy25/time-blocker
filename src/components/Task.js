import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { FaWindowClose } from 'react-icons/fa';
import { GiResize } from 'react-icons/gi';
import moment from 'moment';
import { MdDragHandle } from 'react-icons/md';
import Draggable, { DraggableCore } from 'react-draggable';

export const Task = ({ task }) => {
  const {
    setTaskText,
    deleteTask,
    blockInterval,
    currentTime,
  } = useTableContext();
  const {
    initalBlockSize,
    key,
    dayOfWeek,
    title,
    description,
    timeStart,
    timeEnd,
    date,
  } = task;

  const resizeTask = (reset) => {
    if (reset === 'reset') {
      task.initalBlockSize = blockInterval;
      // task.timeEnd = // need to add
      return 100;
    } else return (initalBlockSize / blockInterval) * 97;
  };

  const isCurrentTask = (props) => {
    return (
      props.timeStart <= props.currentTime &&
      props.timeEnd >= props.currentTime &&
      props.date === moment(props.currentTime).format('l')
    );
  };

  const [taskHeight, setTaskHeight] = useState(resizeTask());

  useEffect(() => {
    setTaskHeight(resizeTask());
  }, [blockInterval]);

  return (
    <Wrapper
      timeStart={timeStart}
      timeEnd={timeEnd}
      isCurrentTask={isCurrentTask}
      currentTime={currentTime}
      taskHeight={taskHeight}
      date={date}
    >
      <div className='input-container'>
        <div className='button-container'>
          <FaWindowClose
            title='Delete Task'
            className='close-btn'
            onClick={() => deleteTask(key, dayOfWeek)}
          />
          <GiResize
            className='close-btn'
            title='Expand / shrink to fill cell'
            onClick={() => setTaskHeight(resizeTask('reset'))}
          />
        </div>
        <textarea
          className='task-title'
          type='text'
          placeholder='Type a name...'
          defaultValue={title}
          focus
          onChange={(e) => setTaskText('title', e.target.value, key, dayOfWeek)}
        />
      </div>
      <span className='time-range'>
        {moment(task.timeStart).format('LT')} -&nbsp;
        {moment(task.timeEnd).format('LT')}
      </span>
      {taskHeight > 60 && (
        <textarea
          placeholder='description...'
          type='text'
          className='description'
          defaultValue={description}
          onChange={(e) =>
            setTaskText('description', e.target.value, key, dayOfWeek)
          }
        />
      )}
      {/* <MdDragHandle className='drag-handle' /> */}
      {/* https://github.com/react-grid-layout/react-draggable/blob/master/example/example.js */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: var(--clr-background-dark);
  height: ${(props) => `${props.taskHeight}%`};
  border-radius: 5px;
  z-index: 1;
  box-shadow: 2px 2px 7px black;
  border: ${(props) =>
    props.isCurrentTask(props)
      ? '3px solid var(--clr-accent)'
      : '2px solid var(--clr-background-dark3)'};
  filter: ${(props) =>
    props.isCurrentTask(props) ? 'brightness(150%)' : null};
  .time-range {
    color: var(--clr-text-light);
    font-family: 'Roboto Mono', monospace;
    align-self: flex-start;
    margin-left: 8px;
    margin-bottom: 3px;
  }
  .task-title {
    border: 0;
    font-size: 1.3rem;
    color: var(--clr-text-light);
  }
  .input-container {
    display: flex;
    height: 40%;
    max-height: 100px;
  }
  .close-btn {
    height: 25px;
    width: 25px;
    order: 2;
    color: var(--clr-background-dark3);
    cursor: pointer;
    :hover {
      filter: brightness(120%);
    }
  }
  .checkbox {
    color: blue;
    ::after {
      color: blue;
    }
  }
  .button-container {
    order: 2;
    width: 28px;
    margin: 3px;
    max-height: 300px;
  }
  .task-title,
  .description {
    width: 90%;
    margin: 5px;
    outline: none;
    font-family: 'Montserrat', sans-serif;
    color: var(--clr-text-light);
    background-color: var(--clr-background-dark);
    letter-spacing: 1px;
    resize: none;
    ::-webkit-scrollbar {
      width: 12px;
      background-color: var(--clr-background-dark);
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #4285f4;
    }
  }
  .description {
    height: 100%;
    border: none;
    color: #a4a4a4;
    letter-spacing: 2px;
    line-height: 130%;
    margin-bottom: 20px;
  }
  .drag-handle {
    height: 20px;
    width: 20px;
    cursor: s-resize;
  }
`;
