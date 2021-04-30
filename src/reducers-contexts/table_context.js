import React, { useReducer, useContext, useEffect } from 'react';
import reducer from './table_reducer';
import moment from 'moment';
import {
  SET_BLOCK_INTERVAL,
  GET_TIMES,
  SHIFT_DAYS,
  SET_TIME_RANGE,
  ADD_TASK,
  SET_BLOCK_SIZE,
} from '../reducers-contexts/actions';

const TableContext = React.createContext();

const initialState = {
  // displays 12:00am of every day
  startTime: new Date(moment().format('LL')).getTime(),
  // displays 11:59pm of every day
  endTime: new Date().setTime(
    new Date(moment().format('LL')).getTime() + 86399000
  ),
  timeColumn: [],
  blockInterval: 30,
  blockSize: 50,
  timeRange: [9, 17],
  loading: false,
  isLoggedIn: false,
  dayColumns: {
    monday: {
      id: 'monday',
      tasks: [],
    },
    tuesday: {
      id: 'tuesday',
      tasks: [],
    },
    wednesday: {
      id: 'wednesday',
      tasks: [],
    },
    thursday: {
      id: 'thursday',
      tasks: [],
    },
    friday: {
      id: 'friday',
      tasks: [],
    },
    saturday: {
      id: 'saturday',
      tasks: [],
    },
    sunday: {
      id: 'sunday',
      tasks: [],
    },
  },
};

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setBlockInterval = (newInterval) => {
    dispatch({ type: SET_BLOCK_INTERVAL, payload: newInterval });
  };
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

  const getTaskTimeRange = (startOrEnd, cellNumber) => {
    const timeRangeToMs = state.timeRange.map((time) => {
      return state.startTime + time * 3600000;
    });
    let result;
    if (startOrEnd === 'start') {
      result =
        timeRangeToMs[0] + state.blockInterval * 60000 * (cellNumber - 1);
    }
    if (startOrEnd === 'end') {
      result = timeRangeToMs[0] + state.blockInterval * 60000 * cellNumber;
    }
    return moment(result).format('LT');
  };

  const resizeTask = (initialBlockSize) => {
    return (initialBlockSize / state.blockInterval) * 100;
  };

  const keepTaskWithStartTime = () => {};

  useEffect(() => {
    keepTaskWithStartTime();
  }, [state.blockInterval, state.timeRange]);

  useEffect(() => {
    resizeTask();
  }, [state.blockInterval]);

  useEffect(() => {
    getTimes();
  }, [state.blockInterval, state.timeRange]);

  return (
    <TableContext.Provider
      value={{
        ...state,
        getTimes,
        setBlockInterval,
        shiftDays,
        setTimeRange,
        addTask,
        getTaskTimeRange,
        resizeTask,
        setBlockSize,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

const useTableContext = () => useContext(TableContext);

export { useTableContext, TableProvider };
