import styled from 'styled-components';
import { TimeColumn } from './TimeColumn';

export const TableSidebar = () => {
  return (
    <Wrapper>
      <TimeColumn />
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  padding-top: 100px;
  width: 150px;
  border-right: 3px solid var(--clr-background-dark);
`;
