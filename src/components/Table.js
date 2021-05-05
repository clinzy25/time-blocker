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
  min-width: 900px;
  height: 100%;
  background-color: var(--clr-background-dark2);
  border-radius: 7px;
  margin-bottom: 200px;
  box-shadow: 5px 5px 10px black;

  .flex-container {
    display: flex;
  }
`;
