import styled from 'styled-components';
import { BiRotateRight } from 'react-icons/bi';
import { MdRemoveCircle } from 'react-icons/md';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useTableContext } from '../reducers-contexts/table_context';
import { WarningModal } from './WarningModal';

export const TableControls = () => {
  const {
    setTimeRange,
    timeRange,
    setBlockInterval,
    shiftDays,
    blockInterval,
    blockSize,
    setBlockSize,
    setWarningModal,
    warningModal,
  } = useTableContext();

  return (
    <Wrapper>
      <div className='left-side-controls'>
        <div className='shift-days-container'>
          <BiRotateRight className='shift-days-icon' onClick={shiftDays} />
          <label htmlFor='shift-days' onClick={shiftDays}>
            Shift days
          </label>
        </div>
        <div className='block-interval-container'>
          <Typography
            className='slider-label'
            id='discrete-slider-small-steps'
            gutterBottom
          >
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
          <Typography
            className='slider-label'
            id='discrete-slider-small-steps'
            gutterBottom
          >
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
          <Typography className='slider-label' id='range-slider' gutterBottom>
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
            className='time-range-label-container'
            id='range-slider'
            align='left'
          >
            <span className='time-range-label-small'>12:00AM</span>
            <span className='time-range-label-small'>11:59PM</span>
          </Typography>
        </div>
      </div>
      <div className='clear-table-container'>
        <MdRemoveCircle
          className='clear-table-icon'
          onClick={() => setWarningModal(true)}
        />
        <label htmlFor='clear-table'>Clear Table</label>
      </div>
      {warningModal ? <WarningModal type={'clearTable'} /> : null}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: var(--clr-text-light);
  padding: 15px;
  border-bottom: 2px solid var(--clr-background-dark);
  .left-side-controls {
    display: flex;
    flex-flow: wrap;
  }
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
  .block-interval-input,
  .block-size-input {
    width: 200px;
    margin: 0 40px;
  }
  .time-range-input {
    width: 250px;
    padding-bottom: 0px;
  }
  .time-range-label-container {
    display: flex;
    justify-content: space-between;
  }
  .time-range-label-small {
    margin-top: 5px;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
  .MuiSlider-track,
  .MuiSlider-rail {
    height: 3px;
  }
  .slider-label {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    margin: 0 40px;
  }
  .clear-table-container {
    width: 200px;
    display: flex;
    flex-flow: wrap;
    align-items: center;
    margin-right: 35px;
  }
  .clear-table-icon {
    color: #690000;
    margin-right: 10px;
    height: 30px;
    width: 30px;
    cursor: pointer;
  }
`;
