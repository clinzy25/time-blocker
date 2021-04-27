import styled from 'styled-components';
import { TableSidebar } from './TableSidebar';
import { TasksContainer } from './TasksContainer';

export const Table = () => {
  return (
    <Wrapper>
      <TableSidebar />
      <TasksContainer />
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  min-height: 80vh;
  width: 90%;
  background-color: #353535;
  border-radius: 7px;
`;
