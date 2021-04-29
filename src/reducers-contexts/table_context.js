import React, { useReducer, useContext, useEffect } from 'react';
import reducer from './table_reducer';
import moment from 'moment';
import {
  SET_BLOCK_SIZE,
  GET_TIMES,
  SHIFT_DAYS,
  SET_TIME_RANGE,
  ADD_TASK,
} from '../reducers-contexts/actions';

const TableContext = React.createContext();

const initialState = {
  timeColumn: [],
  tasks: [],
  // displays 12:00am of every day
  startTime: new Date(moment().format('LL')).getTime(),
  // displays 11:59pm of every day
  endTime: new Date().setTime(
    new Date(moment().format('LL')).getTime() + 86399000
  ),
  blockSize: 30,
  loading: false,
  isLoggedIn: false,
  timeRange: [9, 17],
  dayOrder: [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ],
};

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setBlockSize = (newBlockSize) => {
    dispatch({ type: SET_BLOCK_SIZE, payload: newBlockSize });
  };

  const getTimes = () => {
    dispatch({ type: GET_TIMES });
  };

  const shiftDays = () => {
    dispatch({ type: SHIFT_DAYS });
  };

  const setTimeRange = (newTimeRange) => {
    dispatch({
      type: SET_TIME_RANGE,
      payload: newTimeRange || state.timeRange,
    });
  };

  const addTask = (task) => {
    dispatch({ type: ADD_TASK, payload: task });
  };

  useEffect(() => {
    getTimes();
  }, [state.blockSize, state.timeRange]);

  return (
    <TableContext.Provider
      value={{
        ...state,
        getTimes,
        setBlockSize,
        shiftDays,
        setTimeRange,
        addTask,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

const useTableContext = () => useContext(TableContext);

export { useTableContext, TableProvider };
