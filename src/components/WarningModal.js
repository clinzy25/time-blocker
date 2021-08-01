import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { IoAlertCircle } from 'react-icons/io5';
import { useTableContext } from '../useReducer/table_context';

export const WarningModal = () => {
  const { setWarningModal, clearTable } = useTableContext();

  return (
    <Wrapper>
      <div className='modal'>
        <div className='title-container'>
          <IoAlertCircle className='alert-icon' />
          <h2>Are you sure you want to delete tasks?</h2>
        </div>
        <span>Tasks cannot be retrieved.</span>
        <div className='button-container'>
          <Button
            className='yes'
            variant='outlined'
            color='primary'
            size='small'
            onClick={() => {
              clearTable();
              setWarningModal(false);
            }}
          >
            Yes
          </Button>
          <Button
            className='no'
            variant='outlined'
            color='primary'
            size='small'
            onClick={() => setWarningModal(false)}
          >
            No
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    height: 400px;
    width: 800px;
    background-color: var(--clr-background-dark);
    border-radius: 10px;
    border: 2px solid var(--clr-background-dark3);
  }
  .title-container {
    display: flex;
    align-items: center;
  }
  .button-container {
    margin-top: 60px;
  }
  .yes,
  .no {
    border: 0;
    color: var(--clr-text-light);
    letter-spacing: 3px;
    font-size: 1.3rem;
    margin: 0 20px;
    :hover {
      filter: brightness(110%);
    }
  }
  .yes {
    outline: 0;
    background-color: #690000;
    :hover {
      background-color: #690000;
    }
  }
  .no {
    background-color: var(--clr-accent);
    :hover {
      background-color: var(--clr-accent);
    }
  }
  .alert-icon {
    color: #690000;
    height: 50px;
    width: 50px;
    margin-right: 20px;
  }
`;
