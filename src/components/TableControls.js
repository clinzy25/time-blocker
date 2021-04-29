import styled from 'styled-components';
import { BiRotateRight } from 'react-icons/bi';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useTableContext } from '../reducers-contexts/table_context';

export const TableControls = () => {
  const {
    setTimeRange,
    timeRange,
    setBlockSize,
    shiftDays,
    blockSize
  } = useTableContext();

  return (
    <Wrapper>
      <div className='shift-days-container' onClick={() => {}}>
        <label htmlFor='shift-days'>Shift days</label>
        <BiRotateRight className='shift-days-icon' onClick={shiftDays} />
      </div>
      <div className='block-size-container'>
        <Typography id='discrete-slider-small-steps' gutterBottom>
          <span>Block Size (minutes)</span>
        </Typography>
        <Slider
          className='block-size-input'
          aria-labelledby='discrete-slider-small-steps'
          defaultValue={blockSize}
          step={10}
          marks
          min={10}
          max={120}
          valueLabelDisplay='auto'
          onChange={(_, value) => setBlockSize(value)}
        />
      </div>
      <div className='time-range-container'>
        <Typography id='range-slider' gutterBottom>
          <span>Time Range</span>
        </Typography>
        <Slider
          className='time-range-input'
          defaultValue={timeRange}
          min={0}
          max={24}
          onChange={(_, value) => setTimeRange(value)}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
        />
        <Typography
          className='small-label-container'
          id='range-slider'
          align='left'
        >
          <span className='small-label'>12:00AM</span>
          <span className='small-label'>11:59PM</span>
        </Typography>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 75px;
  width: 100%;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: whitesmoke;
  display: flex;
  padding: 15px;
  border-bottom: 2px solid var(--clr-background-dark);
  .shift-days-icon {
    cursor: pointer;
    color: var(--clr-text-light);
    height: 40px;
    width: 40px;
  }
  .shift-days-container {
    display: flex;
    align-items: center;
    margin-left: 20px;;
  }
  .block-size-container {
    margin: 0 40px;
  }
  .block-size-input {
    width: 250px;
  }
  .time-range-input {
    width: 250px;
    padding-bottom: 0px;
  }
  .small-label-container {
    display: flex;
    justify-content: space-between;
  }
  .small-label {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
  p {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
`;
