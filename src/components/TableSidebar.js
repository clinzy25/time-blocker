import styled from 'styled-components';
import { TableControls } from './TableControls';
import { TimeColumn } from './TimeColumn';

export const TableSidebar = () => {
  return (
    <Wrapper>
      <TableControls />
      <TimeColumn />
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  width: 200px;
  height: 100%;
`;
