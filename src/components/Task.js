import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import { useTaskContext } from '../reducers-contexts/task_context';

export const Task = ({ task }) => {
  const { resizeTask } = useTableContext();
  const {
    setTaskTitle,
    setTaskDescription,
    title,
    description,
  } = useTaskContext();
  
  return (
    <Wrapper taskHeight={resizeTask(task.initalBlockSize)}>
      <input
        className='task-title'
        type='text'
        placeholder='Type a name...'
        value={title}
        focus
        onChange={(e) => setTaskTitle(e.target.value, task.cellKey, task.day)}
      />
      <textarea
        placeholder='description...'
        type='text'
        className='description'
        value={description}
        onChange={(e) =>
          setTaskDescription(e.target.value, task.cellKey, task.day)
        }
      />
    </Wrapper>
  );
};

// https://github.com/atlassian/react-beautiful-dnd

// https://www.npmjs.com/package/re-resizable#live-demo

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
