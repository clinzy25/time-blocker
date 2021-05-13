import { useState } from 'react';
import styled from 'styled-components';
import { BiRotateRight } from 'react-icons/bi';
import { MdRemoveCircle } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useTableContext } from '../reducers-contexts/table_context';
import { WarningModal } from './WarningModal';
import { useWindowSize } from '@react-hook/window-size/throttled';

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
    currentTimeOnTop,
    setCurrentTimeOnTop,
  } = useTableContext();

  const [width] = useWindowSize({ fps: 60 });
  const [expandedControls, setExpandedControls] = useState(false);

  return (
    <Wrapper expanded={expandedControls}>
      {width <= 800 ? (
        <div className='minimized'>
          <GiHamburgerMenu
            className='hamburger'
            onClick={() => setExpandedControls(!expandedControls)}
          />
          {!expandedControls && <h2>Table Controls</h2>}
        </div>
      ) : null}
      <section className='left-side-controls'>
        
        {/* Shift Days */}
        <div className='shift-days-container'>
          <BiRotateRight className='shift-days-icon' onClick={shiftDays} />
          <label htmlFor='shift-days' onClick={shiftDays}>
            Shift days
          </label>
        </div>
        
        {/* Block Interval */}
        <FormControl className='block-interval-container'>
          <Typography
            className='slider-label'
            id='discrete-slider-small-steps'
            gutterBottom
          >
            <span>Block Interval</span>
          </Typography>
          <Select
            labelId='demo-simple-select-label'
            className='block-interval-input'
            id='demo-simple-select'
            value={blockInterval}
            onChange={(e) => setBlockInterval(e.target.value)}
          >
            <MenuItem value={20}>20 min</MenuItem>
            <MenuItem value={30}>30 min</MenuItem>
            <MenuItem value={60}>1 hr</MenuItem>
            <MenuItem value={120}>2 hr</MenuItem>
            <MenuItem value={180}>3 hr</MenuItem>
            <MenuItem value={240}>4 hr</MenuItem>
            <MenuItem value={300}>5 hr</MenuItem>
          </Select>
        </FormControl>

        {/* Block Size */}
        <FormControl className='block-size-container'>
          <Typography
            className='slider-label'
            id='discrete-slider-small-steps'
            gutterBottom
          >
            <span>Block Size</span>
          </Typography>
          <Slider
            className='block-size-input'
            aria-labelledby='discrete-slider-small-steps'
            value={blockSize}
            marks
            min={150}
            max={700}
            valueLabelDisplay='auto'
            onChange={(_, value) => setBlockSize(value)}
          />
        </FormControl>

        {/* Time Range */}
        <FormControl className='time-range-container'>
          <Typography
            className='slider-label time-range-label'
            id='range-slider'
            gutterBottom
          >
            <span>Time Range</span>
          </Typography>
          <Slider
            className='time-range-input'
            value={timeRange}
            min={0}
            max={24}
            onChange={(_, value) => setTimeRange(value)}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
          />
          <Typography
            className='time-range-small-label-container'
            id='range-slider'
            align='left'
          >
            <span className='time-range-label-small'>12:00AM</span>
            <span className='time-range-label-small'>11:59PM</span>
          </Typography>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              className='checkbox'
              checked={currentTimeOnTop}
              onClick={() => setCurrentTimeOnTop()}
              name='currentTimeOnTop'
              color='primary'
            />
          }
          label={
            <Typography className='current-time-on-top-label'>
              Current Time On Top
            </Typography>
          }
        />
      </section>

      {/* Clear Table */}
      <section className='clear-table-container'>
        <MdRemoveCircle
          className='clear-table-icon'
          onClick={() => setWarningModal(true)}
        />
        <label htmlFor='clear-table'>Clear Table</label>
      </section>
      {warningModal ? <WarningModal type={'clearTable'} /> : null}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: var(--clr-text-light);
  border-bottom: 2px solid var(--clr-background-dark);
  .left-side-controls {
    display: flex;
    flex-flow: wrap;
    margin-left: 15px;
  }

  /** Shift Days */
  .shift-days-container {
    display: flex;
    align-items: center;
  }
  .shift-days-icon {
    cursor: pointer;
    color: var(--clr-accent);
    height: 40px;
    width: 40px;
    :hover {
      filter: brightness(130%);
    }
  }

  /** Block Interval */
  .block-interval-input,
  .MuiSelect-icon {
    color: var(--clr-text-light);
  }

  /** Time Range */
  .time-range-small-label-container {
    display: flex;
    justify-content: space-between;
  }
  .time-range-label-small {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  /** Clear Table */
  .clear-table-container {
    width: 200px;
    display: flex;
    align-items: center;
  }
  .clear-table-icon {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    color: #690000;
    cursor: pointer;
    :hover {
      filter: brightness(130%);
    }
  }

  /** Checkbox */
  .checkbox {
    color: var(--clr-text-light);
  }

  /** Multi */
  .block-interval-container,
  .block-size-container,
  .time-range-container {
    width: 200px;
    margin: 0 40px;
  }
  .MuiSlider-track,
  .MuiSlider-rail {
    height: 3px;
  }
  .slider-label,
  .current-time-on-top-label {
    font-family: 'Montserrat', sans-serif;
  }
  @media only screen and (max-width: 800px) {
    height: ${(props) => `${props.expanded ? '10%' : '50px'}`};
    overflow: hidden;
    .hamburger {
      height: 50px;
      width: 50px;
      color: var(--clr-accent);
      cursor: pointer;
    }
    .minimized {
      display: flex;
      align-items: center;
      position: absolute;
      top: 240px;
    }
  }
`;
