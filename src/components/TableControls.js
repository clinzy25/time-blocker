import styled from 'styled-components';
import { BiRotateRight } from 'react-icons/bi';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useTableContext } from '../reducers-contexts/table_context';

export const TableControls = () => {
  const {
    setTimeRange,
    timeRange,
    setBlockInterval,
    shiftDays,
    blockInterval,
    blockSize,
    setBlockSize,
  } = useTableContext();

  return (
    <Wrapper>
      <div className='shift-days-container' onClick={() => {}}>
        <label htmlFor='shift-days'>Shift days</label>
        <BiRotateRight className='shift-days-icon' onClick={shiftDays} />
      </div>
      <div className='block-interval-container'>
        <Typography id='discrete-slider-small-steps' gutterBottom>
          <span>Block Interval (minutes)</span>
        </Typography>
        <Slider
          className='block-interval-input'
          aria-labelledby='discrete-slider-small-steps'
          defaultValue={blockInterval}
          step={10}
          marks
          min={10}
          max={120}
          valueLabelDisplay='auto'
          onChange={(_, value) => setBlockInterval(value)}
        />
      </div>
      <div className='block-size-container'>
        <Typography id='discrete-slider-small-steps' gutterBottom>
          <span>Block Size (height)</span>
        </Typography>
        <Slider
          className='block-interval-input'
          aria-labelledby='discrete-slider-small-steps'
          defaultValue={blockSize}
          marks
          min={50}
          max={150}
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
  color: var(--clr-text-light);
  display: flex;
  padding: 15px;
  border-bottom: 2px solid var(--clr-background-dark);
  .shift-days-icon {
    cursor: pointer;
    color: var(--clr-accent);
    height: 40px;
    width: 40px;
  }
  .shift-days-container {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .block-interval-container, .block-size-container {
    margin: 0 40px;
  }
  .block-interval-input, .block-size-input {
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
  .MuiSlider-track {
    height: 3px;
  }
  .MuiSlider-rail {
    height: 3px;
  }
  p {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
`;
