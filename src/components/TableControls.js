import styled from 'styled-components';
import { BiRotateRight } from 'react-icons/bi';

export const TableControls = () => {
  return (
    <Wrapper>
      <section className='controls-container'>
        <div className='shift-days'>
          <label for='shift-days'>Shift days</label>
          <BiRotateRight className='shift-days-icon' />
        </div>
        <div className='block-size'>
          <label for='block-size'>Block size : </label>
          <input type="number" name='block-size' step='5'/>
        </div>
        <div className='start-time'>
          <label for='start-time'>Start time : </label>
          <input type="time"/>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 1px;
  color: whitesmoke;

  .shift-days-icon {
    cursor: pointer;
    color: whitesmoke;
    height: 40px;
    width: 40px;
  }
`;
