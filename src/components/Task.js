import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';

export const Task = ({ task }) => {
  const { resizeTask } = useTableContext();

  return (
    <Wrapper taskHeight={resizeTask(task.initalBlockSize)}>
      <input
        className='task-title'
        type='text'
        placeholder='Type a name...'
        focus
      />
    </Wrapper>
  );
};

// https://github.com/atlassian/react-beautiful-dnd

// https://www.npmjs.com/package/re-resizable#live-demo

const Wrapper = styled.div`
  background-color: var(--clr-background-dark);
  height: ${(props) => `${props.taskHeight}%`};
  margin: 0 2px;
  border-radius: 5px;
  border: 2px solid var(--clr-background-dark3);
  z-index: 1;
  /* position: absolute; */
  /* left: 50%;  */
  .task-title {
    width: 90%;
    height: 40px;
    margin: 5px;
    border: 0;
    outline: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    color: var(--clr-text-light);
    background-color: var(--clr-background-dark);
  }
`;
