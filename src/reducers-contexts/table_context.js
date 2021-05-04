import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
} from 'react';
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
} from '../reducers-contexts/actions';

const TableContext = React.createContext();

const getLocalStorage = (item) => {
  let tasks = localStorage.getItem('tasks');
  let table_settings = localStorage.getItem('table_settings');
  if (item === 'tasks') {
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
    return table_settings
      ? JSON.parse(table_settings)
      : [30, 50, [9, 17], false];
  }
};

const initialState = {
  // displays 12:00am of every day
  startTime: new Date(moment().format('LL')).getTime(),
  // displays 11:59pm of every day
  endTime: new Date().setTime(
    new Date(moment().format('LL')).getTime() + 86399000
  ),
  timeColumn: [],
  blockInterval: getLocalStorage('table_settings')[0],
  blockSize: getLocalStorage('table_settings')[1],
  timeRange: getLocalStorage('table_settings')[2],
  loading: false,
  isWarningModalOpen: false,
  isLoggedIn: getLocalStorage('table_settings')[3],
  dayColumns: getLocalStorage('tasks'),
};

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [warningModal, setWarningModal] = useState(false);

  const getTimes = () => {
    dispatch({ type: GET_TIMES });
  };

  const setBlockInterval = (newInterval) => {
    dispatch({ type: SET_BLOCK_INTERVAL, payload: newInterval });
  };
  const setBlockSize = (newBlockSize) => {
    dispatch({ type: SET_BLOCK_SIZE, payload: newBlockSize });
  };

  const resizeTask = (initialBlockSize) => {
    return (initialBlockSize / state.blockInterval) * 94;
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
    console.log(state.dayColumns);
    dispatch({ type: ADD_TASK, payload: task });
  };

  const clearTable = () => {
    dispatch({ type: CLEAR_TABLE });
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

  // const openWarningModal = (whatToDelete) => {
  //   dispatch({ type: OPEN_WARNING_MODAL, payload: whatToDelete });
  // };

  const setTaskText = (textType, newText, cellKey, day) => {
    return state.dayColumns.map((col) => {
      if (col.id === day) {
        return col.tasks.map((task) => {
          if (task.key === cellKey) {
            return textType === 'title'
              ? (task.title = newText)
              : (task.description = newText);
          } else return null;
        });
      } else return null;
    });
  };

  const deleteTask = (cellKey, day) => {
    dispatch({ type: DELETE_TASK, payload: { cellKey, day } });
  };
  
  useEffect(() => {
    resizeTask();
  }, [state.blockInterval]);

  useEffect(() => {
    getTimes();
  }, [state.blockInterval, state.timeRange]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.dayColumns));
  }, [state.dayColumns, setTaskText]);

  useEffect(() => {
    localStorage.setItem(
      'table_settings',
      JSON.stringify([
        state.blockInterval,
        state.blockSize,
        state.timeRange,
        state.isLoggedIn,
      ])
    );
  }, [state.blockInterval, state.blockSize, state.timeRange, state.isLoggedIn]);

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
        setTaskText,
        clearTable,
        warningModal,
        setWarningModal,
        deleteTask,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

const useTableContext = () => useContext(TableContext);

export { useTableContext, TableProvider };
