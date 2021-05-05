import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { FaWindowClose } from 'react-icons/fa';
import { GiResize } from 'react-icons/gi';
import moment from 'moment';

export const Task = ({ task }) => {
  const {
    setTaskText,
    deleteTask,
    blockInterval,
  } = useTableContext();
  const { initalBlockSize, key, dayOfWeek, title, description} = task;

  const resizeTask = (reset) => {
    if (reset === 'reset') {
      task.initalBlockSize = blockInterval;
      // task.timeEnd = // need to add
      return 100;
    }
    else return (initalBlockSize / blockInterval) * 97;
  }
  
  const [taskHeight, setTaskHeight] = useState(resizeTask());

  useEffect(() => {
    setTaskHeight(resizeTask());
  }, [blockInterval]);

  return (
    <Wrapper taskHeight={taskHeight}>
      <div className='placeholder' />
      <div className='input-container'>
        <div className='button-container'>
          <FaWindowClose
            title='Delete Task'
            className='close-btn'
            onClick={() => deleteTask(key, dayOfWeek)}
          />
          <GiResize
            className='close-btn'
            title='Expand to fill cell'
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
      {resizeTask(initalBlockSize) > 40 && (
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
  border: 2px solid var(--clr-background-dark3);
  z-index: 1;
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
  }
`;
