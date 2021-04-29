import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';

export const Task = ({ cellKey }) => {
  const { tasks } = useTableContext();

  const task = tasks.find((task) => task.key === cellKey);
  if (task) {
    return (
      <Wrapper>
        <input
          className='task-title'
          type='text'
          placeholder='Type a name...'
          focus
        />
      </Wrapper>
    );
  } else {
    return null;
  }
};

// https://www.npmjs.com/package/re-resizable#live-demo

const Wrapper = styled.div`
  background-color: var(--clr-background-dark);
  height: 95%;
  margin: 5px;
  border-radius: 5px;
  .task-title {
    margin: 5px;
    width: 90%;
    height: 40px;
    border: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    color: var(--clr-text-light);
    background-color: var(--clr-background-dark);
  }
`;
