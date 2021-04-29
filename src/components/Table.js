import styled from 'styled-components';
import { TableSidebar } from './TableSidebar';
import { TasksContainer } from './TasksContainer';
import { TableControls } from './TableControls';

export const Table = () => {
  return (
    <Wrapper>
      <TableControls />
      <div className='flex-container'>
        <TableSidebar />
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
  .flex-container {
    display: flex;
  }
`;
