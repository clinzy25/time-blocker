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

const table_reducer = (state, action) => {
  switch (action.type) {
    case SET_TABLE_TITLE:
      return { ...state, tableTitle: action.payload };
    case SET_USER_BEGIN: {
      return { ...state, loading: true };
    }
    case SET_USER_SUCCESS: {
      return { ...state, user: action.payload };
    }
    case GET_TABLE_SETTINGS_BEGIN:
      return { ...state, loading: true };
      case GET_TABLE_SETTINGS_SUCCESS:
      const {
        block_interval,
        block_size,
        current_time_on_top,
        day_columns,
        table_title,
        time_range,
      } = action.payload;
      console.log(day_columns)
      return {
        ...state,
        blockInterval: block_interval,
        blockSize: block_size,
        currentTimeOnTop: current_time_on_top,
        tableTitle: table_title,
        timeRange: time_range,
        dayColumns: day_columns,
        loading: false,
      };
    /**
     * Table Controls
     */
    case SET_BLOCK_INTERVAL:
      return { ...state, blockInterval: action.payload };

    case SET_TIME_RANGE:
      return { ...state, timeRange: action.payload };

    case SET_BLOCK_SIZE:
      return { ...state, blockSize: action.payload };

    case SHIFT_DAYS:
      const newDayOrder = [
        state.dayColumns[state.dayColumns.length - 1],
        ...state.dayColumns.slice(0, state.dayColumns.length - 1),
      ];
      return {
        ...state,
        dayColumns: newDayOrder,
      };

    case CLEAR_TABLE:
      const clearedDayColumns = [...state.dayColumns];
      clearedDayColumns.map((col) => (col.tasks = []));
      return {
        ...state,
        dayColumns: clearedDayColumns,
      };

    case SET_CURRENT_TIME_ON_TOP:
      return {
        ...state,
        currentTimeOnTop: !state.currentTimeOnTop,
      };
    /**
     * Task Controls
     */
    case ADD_TASK:
      const newDayColumns = [...state.dayColumns];
      newDayColumns.find((column) => {
        if (column.id === action.payload.dayOfWeek) {
          const newTasks = [...column.tasks, action.payload];
          column.tasks = newTasks;
        }
      });
      return {
        ...state,
        dayColumns: newDayColumns,
      };

    case DELETE_TASK: {
      const { key, dayOfWeek } = action.payload;
      const filteredDayColumns = [...state.dayColumns];
      filteredDayColumns.find((column) => {
        if (column.id === dayOfWeek) {
          const newTasks = column.tasks.filter((task) => task.key !== key);
          column.tasks = newTasks;
        }
      });
      return {
        ...state,
        dayColumns: filteredDayColumns,
      };
    }

    /** Return new dayColumn with updated task description or title */
    case SET_TASK_TEXT:
      const { textType, newText, key, dayOfWeek } = action.payload;
      const newTextDayColumns = state.dayColumns.map((column) => {
        if (column.id !== dayOfWeek) return column;
        const newTasks = column.tasks.map((task) => {
          if (task.key === key && textType === 'title') {
            return { ...task, title: newText };
          }
          if (task.key === key && textType === 'description') {
            return { ...task, description: newText };
          }
          return task;
        });
        return { ...column, tasks: newTasks };
      });
      return {
        ...state,
        dayColumns: newTextDayColumns,
      };

    /**
     * Populate @ array, between @param timeRange, with interval @param blockInterval
     * If currentTimeOnTop is checked, filter times by currentTime before updating state
     * */
    case GET_TIMES:
      const {
        blockInterval,
        timeRange,
        startTime,
        currentTimeOnTop,
        currentTime,
      } = state;
      /** Divide @param blockInterval by minutes in a day. Determines number of blocks */
      const numBlocks = 1440 / blockInterval;
      /** Convert timeRange to milliseconds*/
      const timeRangeToMs = timeRange.map((time) => startTime + time * 3600000);
      let newTimeColumn = [];
      /** First time determined by timeRange */
      newTimeColumn.push(timeRangeToMs[0]);
      let lastTimeInLoop = timeRangeToMs[0];
      for (let i = 0; i < numBlocks; i++) {
        let newTime = lastTimeInLoop + blockInterval * 60000;
        if (newTime >= timeRangeToMs[1]) break;
        newTimeColumn.push(newTime);
        lastTimeInLoop = newTime;
      }
      /** Last time determined by timeRange */
      newTimeColumn.push(timeRangeToMs[1]);
      return {
        ...state,
        timeColumn: currentTimeOnTop
          ? newTimeColumn.filter(
              (time) => time >= currentTime - blockInterval * 60000
            )
          : newTimeColumn,
      };

    default:
      throw new Error('No matching action type');
  }
};

export default table_reducer;
