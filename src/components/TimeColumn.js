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
  .time {
    margin: ${(props) => `${props.blockSize}px 15px;`};
    color: var(--clr-text-light);
    letter-spacing: 2px;
  }
`;
