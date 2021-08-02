import React, { useContext, useEffect, useState } from 'react';
import reducer from './table_reducer';
import moment from 'moment';
import { useReducerAsync } from 'use-reducer-async';
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
  GET_TABLE_DATA_BEGIN,
  GET_TABLE_DATA_SUCCESS,
  SET_USER_BEGIN,
  SET_USER_SUCCESS,
  ASYNC_UPDATE_DAY_COLUMN,
  ASYNC_UPDATE_TABLE_SETTINGS,
} from './table_actions';
import {
  firebaseGetTableData,
  firebaseSetUser,
  firebaseUpdateDayColumn,
  firebaseUpdateTableSettings,
} from './firebase_actions';

const TableContext = React.createContext();

const initialState = {
  user: null,
  /** 12:00am of current day */
  startTime: new Date(moment().format('LL')).getTime(),
  /** 11:59pm of current day */
  endTime: new Date().setTime(
    new Date(moment().format('LL')).getTime() + 86399000
  ),
  currentTime: new Date().getTime(),
  timeColumn: [],
  isWarningModalOpen: false,
  dayColumns: [
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
  ],
  blockInterval: 30,
  blockSize: 300,
  timeRange: [9, 17],
  tableTitle: 'TASKS',
  currentTimeOnTop: false,
  loading: true,
  loading_user: true,
  loading_data: false,
};

const TableProvider = ({ children }) => {
  /**
   * Handle firebase updates with use-reducer-async library
   * See link for usage
   * @link - https://github.com/dai-shi/use-reducer-async
   */
  const asyncActionHandlers = {
    TABLE_DATA:
      ({ dispatch }) =>
      async (action) => {
        dispatch({ type: GET_TABLE_DATA_BEGIN, payload: action.username });
        const result = await firebaseGetTableData(action.username);
        dispatch({ type: GET_TABLE_DATA_SUCCESS, payload: result });
      },

    SET_USER:
      ({ dispatch }) =>
      async (action) => {
        const {
          auth0User,
          blockInterval,
          blockSize,
          timeRange,
          tableTitle,
          currentTimeOnTop,
          dayColumns,
        } = action;
        dispatch({
          type: SET_USER_BEGIN,
          payload: {
            auth0User,
            blockInterval,
            blockSize,
            timeRange,
            tableTitle,
            currentTimeOnTop,
            dayColumns,
          },
        });
        const user = await firebaseSetUser(
          auth0User,
          blockInterval,
          blockSize,
          timeRange,
          tableTitle,
          currentTimeOnTop,
          dayColumns
        );
        dispatch({ type: SET_USER_SUCCESS, payload: user });
      },

    UPDATE_DAY_COLUMN:
      ({ dispatch }) =>
      async (action) => {
        const { dayColumn, userName } = action;
        dispatch({
          type: ASYNC_UPDATE_DAY_COLUMN,
          dayColumn,
          userName,
        });
        await firebaseUpdateDayColumn(dayColumn, userName);
      },

    UPDATE_TABLE_SETTINGS:
      ({ dispatch }) =>
      async (action) => {
        const { setting, value, userName } = action;
        dispatch({
          type: ASYNC_UPDATE_TABLE_SETTINGS,
          setting,
          value,
          userName,
        });
        await firebaseUpdateTableSettings(setting, value, userName);
      },
  };
  /** Extend useReducer's dispatch so that dispatching async actions invoke async functions */
  const [state, dispatch] = useReducerAsync(
    reducer,
    initialState,
    asyncActionHandlers
  );

  /** Simple state value to determine if modal is open */
  const [warningModal, setWarningModal] = useState(false);

  ///////////////////////////////////////////////////////////////////////
  // Action creators ////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////////
  // UseEffects ////////////////////////////////////////////////////

  /** Update current time once per minute */
  useEffect(() => {
    setInterval(() => {
      const newCurrentTime = new Date().getTime();
      state.currentTime = newCurrentTime;
    }, 60000);
  }, [state.currentTime]);

  /** Update timeColumn when table controls are adjusted */
  useEffect(() => {
    !state.loading && getTimes();
  }, [
    state.blockInterval,
    state.timeRange,
    state.currentTimeOnTop,
    state.currentTime,
    state.loading,
  ]);

  /** Update dayColumn in firebase when table task is added or edited are adjusted */
  useEffect(() => {
    !state.loading &&
      dispatch({
        type: 'UPDATE_DAY_COLUMN',
        dayColumn: state.dayColumns,
        userName: state.user.name,
      });
  }, [state.dayColumns]);

  /**
   * Update table settings individually in firebase when they are adjusted
   */
  useEffect(() => {
    !state.loading &&
      dispatch({
        type: 'UPDATE_TABLE_SETTINGS',
        setting: 'block_interval',
        value: state.blockInterval,
        userName: state.user.name,
      });
  }, [state.loading, state.blockInterval]);

  useEffect(() => {
    !state.loading &&
      dispatch({
        type: 'UPDATE_TABLE_SETTINGS',
        setting: 'block_size',
        value: state.blockSize,
        userName: state.user.name,
      });
  }, [state.loading, state.blockSize]);

  useEffect(() => {
    !state.loading &&
      dispatch({
        type: 'UPDATE_TABLE_SETTINGS',
        setting: 'current_time_on_top',
        value: state.currentTimeOnTop,
        userName: state.user.name,
      });
  }, [state.loading, state.currentTimeOnTop]);

  useEffect(() => {
    !state.loading &&
      dispatch({
        type: 'UPDATE_TABLE_SETTINGS',
        setting: 'time_range',
        value: state.timeRange,
        userName: state.user.name,
      });
  }, [state.loading, state.timeRange]);

  useEffect(() => {
    !state.loading &&
      dispatch({
        type: 'UPDATE_TABLE_SETTINGS',
        setting: 'table_title',
        value: state.tableTitle,
        userName: state.user.name,
      });
  }, [state.loading, state.tableTitle]);

  /**
   * Log state for development
   */
  // console.log('State:', state);
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
        dispatch,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

const useTableContext = () => useContext(TableContext);

export { useTableContext, TableProvider };
