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
  GET_TABLE_SETTINGS_BEGIN,
  GET_TABLE_SETTINGS_SUCCESS,
  SET_USER_BEGIN,
  SET_USER_SUCCESS,
} from './table_actions';
import db from '../firebase';
import { useReducerAsync } from 'use-reducer-async';
import { firebaseGetTableSettings, firebaseSetUser } from './firebase_actions';

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
  loading: true,
};

const TableProvider = ({ children }) => {
  const asyncActionHandlers = {
    TABLE_SETTINGS:
      ({ dispatch }) =>
      async (action) => {
        dispatch({ type: GET_TABLE_SETTINGS_BEGIN, payload: action.username });
        const result = await firebaseGetTableSettings(action.username);
        dispatch({ type: GET_TABLE_SETTINGS_SUCCESS, payload: result });
      },
    SET_USER:
      ({ dispatch }) =>
      async (action) => {
        dispatch({ type: SET_USER_BEGIN, payload: action.auth0User });
        const user = await firebaseSetUser(action.auth0User);
        dispatch({ type: SET_USER_SUCCESS, payload: user });
      },
  };

  const [state, dispatch] = useReducerAsync(
    reducer,
    initialState,
    asyncActionHandlers
  );

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
    !state.loading && getTimes();
  }, [
    state.blockInterval,
    state.timeRange,
    state.currentTimeOnTop,
    state.currentTime,
    state.loading,
  ]);

  /**
   * Log state and DB for development
   */
  console.log('State:', state);
  console.log('Firestore:', db);
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
