import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { FaWindowClose } from 'react-icons/fa';

export const Task = ({ task }) => {
  const { resizeTask, setTaskText, deleteTask } = useTableContext();
  const { initalBlockSize, key, dayOfWeek, title, description } = task;

  return (
    <Wrapper taskHeight={resizeTask(initalBlockSize)}>
      <div className='input-container'>
        <FaWindowClose
          className='close-btn'
          onClick={() => deleteTask(key, dayOfWeek)}
        />
        <input
          className='task-title'
          type='text'
          placeholder='Type a name...'
          defaultValue={title}
          focus
          onChange={(e) => setTaskText('title', e.target.value, key, dayOfWeek)}
        />
      </div>
      <textarea
        placeholder='description...'
        type='text'
        className='description'
        defaultValue={description}
        onChange={(e) =>
          setTaskText('description', e.target.value, key, dayOfWeek)
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: var(--clr-background-dark);
  height: ${(props) => `${props.taskHeight}%`};
  margin: 0 2px;
  border-radius: 5px;
  border: 2px solid var(--clr-background-dark3);
  z-index: 1;
  .task-title {
    height: 40px;
    border: 0;
    font-size: 1.3rem;
  }
  .input-container {
    display: flex;
  }
  .close-btn {
    height: 25px;
    width: 25px;
    order: 2;
    margin: 4px 5px 0 0;
    color: var(--clr-background-dark3);
    cursor: pointer;
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
  }
  .description {
    height: 100%;
    border: none;
  }
`;

// https://github.com/atlassian/react-beautiful-dnd

// https://www.npmjs.com/package/re-resizable#live-demo
