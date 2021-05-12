import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { FaWindowClose } from 'react-icons/fa';
import { GiResize } from 'react-icons/gi';
import moment from 'moment';
import { MdDragHandle } from 'react-icons/md';
import Draggable, { DraggableCore } from 'react-draggable';

/**
 * Each task's state is contained in this file.
 * @param {object} task - Task from dayColumns.tasks
 * @returns A task
 */
export const Task = ({ task }) => {
  const { setTaskText, deleteTask, blockInterval, currentTime } =
    useTableContext();
  const {
    key,
    dayOfWeek,
    date,
    title,
    description,
    timeStart,
    timeEnd,
    initalBlockSize,
  } = task;

  /**
   * Called by setTaskHeight from resize button and BlockSize slider
   * @param {string} reset
   */
  const resizeTask = useCallback(
    (reset) => {
      if (reset === 'reset') {
        task.initalBlockSize = blockInterval;
        task.timeEnd = task.timeStart + blockInterval * 60000;
        return 97;
      } else {
        return (initalBlockSize / blockInterval) * 97;
      }
    },
    [
      task.initalBlockSize,
      task.timeEnd,
      task.timeStart,
      blockInterval,
      initalBlockSize,
    ]
  );

  /**
   * @param props - Styled components props attribute
   * @returns - true if currentTime is within task start/end time, else false
   * Used to style current task
   */
  const isCurrentTask = (props) =>
    props.timeStart <= props.currentTime &&
    props.timeEnd >= props.currentTime &&
    props.date === moment(props.currentTime).format('l');

  const [taskHeight, setTaskHeight] = useState(resizeTask());

  useEffect(() => {
    setTaskHeight(resizeTask());
  }, [blockInterval, resizeTask]);

  return (
    <Wrapper
      timeStart={timeStart}
      timeEnd={timeEnd}
      isCurrentTask={isCurrentTask}
      currentTime={currentTime}
      taskHeight={taskHeight}
      date={date}
    >
      {/* Buttons */}
      <div className='title-btns-container'>
        <div className='btn-container'>
          <FaWindowClose
            title='Delete Task'
            className='btn'
            onClick={() => deleteTask(key, dayOfWeek)}
          />
          <GiResize
            title='Expand / shrink to fill cell'
            className='btn'
            onClick={() => setTaskHeight(resizeTask('reset'))}
          />
        </div>

        {/* Inputs and time range */}
        <textarea
          type='text'
          placeholder='Type a name...'
          className='task-title'
          defaultValue={title}
          // autoFocus
          onChange={(e) => setTaskText('title', e.target.value, key, dayOfWeek)}
        />
      </div>
      <span className='time-range'>
        {moment(task.timeStart).format('LT')} -&nbsp;
        {moment(task.timeEnd).format('LT')}
      </span>
      {/* Only display description if taskHeight > 60px */}
      {taskHeight > 45 && (
        <textarea
          type='text'
          placeholder='description...'
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
  height: ${(props) => `${props.taskHeight}%`};
  z-index: 1;
  background-color: var(--clr-background-dark);
  border-radius: 5px;
  box-shadow: 2px 2px 7px #121212;
  min-height: 75px;
  /** Props change if task is current task */
  border: ${(props) =>
    props.isCurrentTask(props)
      ? '3px solid var(--clr-accent)'
      : '2px solid var(--clr-background-dark3)'};
  filter: ${(props) => props.isCurrentTask(props) && 'brightness(150%)'};
  .title-btns-container {
    display: flex;
    height: 40%;
    min-height: 40px;
    max-height: 75px;
    width: 100%;
  }
  .task-title {
    font-size: 1.3rem;
    color: var(--clr-text-light);
    overflow-x: hidden;
    width: 100%;
    ::placeholder {
      white-space: nowrap;
    }
  }
  .btn-container {
    order: 2;
    width: 28px;
    margin: 3px;
    max-height: 300px;
  }
  .btn {
    height: 25px;
    width: 25px;
    order: 2;
    color: var(--clr-background-dark3);
    cursor: pointer;
    :hover {
      filter: brightness(120%);
    }
  }
  .time-range {
    color: var(--clr-text-light);
    font-family: 'Roboto Mono', monospace;
    align-self: flex-start;
    margin: 2% 0 3px 8px;
    position: relative;
  }
  .task-title,
  .description {
    width: 90%;
    margin: 5px;
    outline: none;
    resize: none;
    border: none;
    font-family: 'Montserrat', sans-serif;
    color: var(--clr-text-light);
    background-color: var(--clr-background-dark);
    letter-spacing: 1px;
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
    color: #a4a4a4;
    letter-spacing: 2px;
    line-height: 130%;
  }
`;
