import styled from 'styled-components';
import { TasksContainer } from './TasksContainer';
import { TableControls } from './TableControls';
import { TimeColumn } from './TimeColumn';
import { useWindowSize } from '@react-hook/window-size/throttled';

export const Table = () => {
  const [width] = useWindowSize({ fps: 60 });

  /**
   * Desktop - render time column
   * Mobile - TimeColumn rendering passed to TaskContainer
   * so that 7 can be rendered
   */
  return width >= 1100 ? (
    <WrapperDesktop>
      <TableControls />
      <div className='flex-container'>
        <TimeColumn />
        <TasksContainer />
      </div>
    </WrapperDesktop>
  ) : (
    <WrapperMobile>
      <TableControls />
      <TasksContainer />
    </WrapperMobile>
  );
};

const WrapperDesktop = styled.article`
  width: 90%;
  background-color: var(--clr-background-dark2);
  border-radius: 7px;
  margin-bottom: 200px;
  box-shadow: 5px 5px 10px #121212;
  .flex-container {
    display: flex;
  }
`;

const WrapperMobile = styled.article`
  width: 90%;
  background-color: var(--clr-background-dark2);
  border-radius: 7px;
  margin-bottom: 200px;
  box-shadow: 5px 5px 10px #121212;
  display: flex;
  flex-flow: column;
`;
