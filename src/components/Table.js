import styled from 'styled-components';
import { TasksContainer } from './TasksContainer';
import { TableControls } from './TableControls';
import { TimeColumn } from './TimeColumn';

export const Table = () => {
  
  return (
    <Wrapper>
      <TableControls />
      <div className='flex-container'>
        <TimeColumn />
        <TasksContainer />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 90%;
  background-color: var(--clr-background-dark2);
  border-radius: 7px;
  margin-bottom: 200px;
  min-width: 900px;
  .flex-container {
    display: flex;
  }
`;
