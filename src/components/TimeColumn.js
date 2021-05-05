import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';
import moment from 'moment';

export const TimeColumn = () => {
  const { timeColumn, blockSize } = useTableContext();

  return (
    <Wrapper blockSize={blockSize}>
      {timeColumn.map((time, index) => {
        return (
          <p key={index} className='time'>
            {moment(time).format('LT')}
          </p>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  padding-top: 100px;
  width: 125px;
  min-width: 125px;
  border-right: 3px solid var(--clr-background-dark);
  .time {
    height: ${(props) => `${props.blockSize}px;`};
    color: var(--clr-text-light);
    font-family:'Roboto Mono', monospace;
    letter-spacing: 2px;
    margin: 0;
    position: relative;
    top: -10px;
  }
`;