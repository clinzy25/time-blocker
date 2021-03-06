import styled from 'styled-components';
import { useTableContext } from '../useReducer/table_context';
import moment from 'moment';

/**
 * Get times for timeColumn
 * @returns The vertical tape of times on the left side of the screen
 */
export const TimeColumn = () => {
  const { timeColumn, blockSize } = useTableContext();

  return (
    // BlockSize determines height of cell
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
  min-width: 100px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  padding-top: 100px;
  border-right: 2px solid var(--clr-background-dark);
  .time {
    position: relative;
    top: -10px;
    margin: 0 5px 0 0;
    height: ${(props) => `${props.blockSize}px;`};
    color: var(--clr-text-light);
    font-family: 'Roboto Mono', monospace;
    letter-spacing: 2px;
  }
  @media only screen and (max-width: 1100px) {
    min-width: 0px;
    .time {
      word-wrap: break-word;
      width: 45%;
      top: 20px;
    }
  }
`;
