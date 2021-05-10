import React, { useReducer, useContext, useEffect, useState } from 'react';
import reducer from './table_reducer';
import moment from 'moment';
import {
  SET_BLOCK_INTERVAL,
  GET_TIMES,
  SHIFT_DAYS,
  SET_TIME_RANGE,
  ADD_TASK,
  SET_BLOCK_SIZE,
  CLEAR_TABLE,
  DELETE_TASK,
  SET_TABLE_TITLE,
  SET_CURRENT_TIME_ON_TOP,
  SET_TASK_TEXT,
} from '../reducers-contexts/actions';

const TableContext = React.createContext();

const tasks = localStorage.getItem('tasks');
const block_interval = localStorage.getItem('block_interval');
const block_size = localStorage.getItem('block_size');
const time_range = localStorage.getItem('time_range');
const table_title = localStorage.getItem('table_title');
const current_time_on_top = localStorage.getItem('current_time_on_top');

/**
 * Default values retured if they DNE in localStorage
 * @default [dayColumns] - see below
 * @default [block_interval] - 30
 * @default [block_size] - 200
 * @default [time_range] - [9,17]
 * @default [table_title] - 'TASKS'
 * @default [current_time_on_top] - false
 */
const getLocalStorage = (item) => {
  switch (item) {
    case 'tasks':
      return tasks
        ? JSON.parse(tasks)
        : [
            {
              id: 'monday',
              tasks: [],
            },
            {
              id: 'tuesday',
              tasks: [],
            },
            {
              id: 'wednesday',
              tasks: [],
            },
            {
              id: 'thursday',
              tasks: [],
            },
            {
              id: 'friday',
              tasks: [],
            },
            {
              id: 'saturday',
              tasks: [],
            },
            {
              id: 'sunday',
              tasks: [],
            },
          ];
    case 'block_interval':
      return block_interval ? JSON.parse(block_interval) : 30;
    case 'block_size':
      return block_size ? JSON.parse(block_size) : 200;
    case 'time_range':
      return time_range ? JSON.parse(time_range) : [9, 17];
    case 'table_title':
      return table_title ? JSON.parse(table_title) : 'TASKS';
    case 'current_time_on_top':
      return current_time_on_top ? JSON.parse(current_time_on_top) : false;
    default:
      return null;
  }
};

const initialState = {
  /** 12:00am of current day */
  startTime: new Date(moment().format('LL')).getTime(),
  /** 11:59pm of current day */
  endTime: new Date().setTime(
    new Date(moment().format('LL')).getTime() + 86399000
  ),
  currentTime: new Date().getTime(),
  timeColumn: [],
  isWarningModalOpen: false,
  dayColumns: getLocalStorage('tasks'),
  blockInterval: getLocalStorage('block_interval'),
  blockSize: getLocalStorage('block_size'),
  timeRange: getLocalStorage('time_range'),
  tableTitle: getLocalStorage('table_title'),
  currentTimeOnTop: getLocalStorage('current_time_on_top'),
};

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [warningModal, setWarningModal] = useState(false);

  const setTableTitle = (newTableTitle) => {
    dispatch({ type: SET_TABLE_TITLE, payload: newTableTitle });
  };

  const getTimes = (currentTime) => {
    dispatch({ type: GET_TIMES, payload: currentTime });
  };

  /**
   * Table Controls
   * @param {number} newInterval
   * @param {number} newBlockSize
   * @param {array} newTimeRange
   */

  const setBlockInterval = (newInterval) => {
    dispatch({ type: SET_BLOCK_INTERVAL, payload: newInterval });
  };

  const setBlockSize = (newBlockSize) => {
    dispatch({ type: SET_BLOCK_SIZE, payload: newBlockSize });
  };

  const shiftDays = () => {
    dispatch({ type: SHIFT_DAYS });
  };

  const setTimeRange = (newTimeRange) => {
    dispatch({ type: SET_TIME_RANGE, payload: newTimeRange });
  };

  const clearTable = () => {
    dispatch({ type: CLEAR_TABLE });
  };

  const setCurrentTimeOnTop = () => {
    dispatch({ type: SET_CURRENT_TIME_ON_TOP });
  };

  /**
   * Task Controls
   * @param {object} task - A new task to be added to the state
   * @param {number} key - Task key of task for lookup, which is cellTime in ms
   * @param {string} dayOfWeek - DayColumn of task for lookup
   * @param {string} textType - Type of text being edited, 'title' or 'description'
   */
  const setTaskText = (textType, newText, key, dayOfWeek) => {
    dispatch({
      type: SET_TASK_TEXT,
      payload: { textType, newText, key, dayOfWeek },
    });
  };

  const addTask = (task) => {
    dispatch({ type: ADD_TASK, payload: task });
  };

  const deleteTask = (key, dayOfWeek) => {
    dispatch({ type: DELETE_TASK, payload: { key, dayOfWeek } });
  };

  /** Update current time once per minute */
  useEffect(() => {
    setInterval(() => {
      const newCurrentTime = new Date().getTime();
      state.currentTime = newCurrentTime;
    }, 60000);
  }, [state.currentTime]);

  /** Update timeColumn when table controls are adjusted */
  useEffect(() => {
    getTimes();
  }, [state.blockInterval, state.timeRange, state.currentTimeOnTop]);

  /** Local storage setters */
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.dayColumns));
  }, [state.dayColumns]);

  useEffect(() => {
    localStorage.setItem('block_interval', JSON.stringify(state.blockInterval));
  }, [state.blockInterval]);

  useEffect(() => {
    localStorage.setItem('block_size', JSON.stringify(state.blockSize));
  }, [state.blockSize]);

  useEffect(() => {
    localStorage.setItem('time_range', JSON.stringify(state.timeRange));
  }, [state.timeRange]);

  useEffect(() => {
    localStorage.setItem('table_title', JSON.stringify(state.tableTitle));
  }, [state.tableTitle]);

  useEffect(() => {
    localStorage.setItem(
      'current_time_on_top',
      JSON.stringify(state.currentTimeOnTop)
    );
  }, [state.currentTimeOnTop]);

  return (
    <TableContext.Provider
      value={{
        ...state,
        getTimes,
        setBlockInterval,
        shiftDays,
        setTimeRange,
        addTask,
        setBlockSize,
        setTaskText,
        clearTable,
        warningModal,
        setWarningModal,
        deleteTask,
        setTableTitle,
        setCurrentTimeOnTop,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

const useTableContext = () => useContext(TableContext);

export { useTableContext, TableProvider };
