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

const getLocalStorage = (item) => {
  let tasks = localStorage.getItem('tasks');
  let table_settings = localStorage.getItem('table_settings');
  if (item === 'tasks') {
    /**
     * Default values retured if tasks DNE in localStorage
     * @default [dayColumns]
     */
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
  }
  if (item === 'table_settings') {
    /**
     * Default values for table controls stored in array
     * @default [blockInterval]
     * @default [blockSize]
     * @default [timeRange]
     * @default [tableTitle]
     */
    return table_settings
      ? JSON.parse(table_settings)
      : [30, 200, [9, 17], 'TASKS'];
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
  blockInterval: getLocalStorage('table_settings')[0],
  blockSize: getLocalStorage('table_settings')[1],
  timeRange: getLocalStorage('table_settings')[2],
  tableTitle: getLocalStorage('table_settings')[3],
  isWarningModalOpen: false,
  dayColumns: getLocalStorage('tasks'),
  currentTimeOnTop: false,
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
  const setTaskText = (textType, newText, key, dayOfWeek) =>
    /** Find task being edited in state */
    state.dayColumns.map(
      (col) =>
        col.id === dayOfWeek &&
        col.tasks.map((task) =>
          /** Change title or description according to @param textType */
          task.key === key && textType === 'title'
            ? (task.title = newText)
            : (task.description = newText)
        )
    );

  // const setTaskText = (textType, newText, key, dayOfWeek) => {
  //   dispatch({
  //     type: SET_TASK_TEXT,
  //     payload: { textType, newText, key, dayOfWeek },
  //   });
  // };

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
    localStorage.setItem(
      'table_settings',
      JSON.stringify([
        state.blockInterval,
        state.blockSize,
        state.timeRange,
        state.tableTitle,
      ])
    );
  }, [state.blockInterval, state.blockSize, state.timeRange, state.tableTitle, state.dayColumns]);

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
