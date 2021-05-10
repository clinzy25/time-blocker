import {
  SET_BLOCK_INTERVAL,
  GET_TIMES,
  SHIFT_DAYS,
  SET_TIME_RANGE,
  ADD_TASK,
  SET_BLOCK_SIZE,
  CLEAR_TABLE,
  DELETE_TASK,
} from './actions';

const table_reducer = (state, action) => {
  switch (action.type) {
    case SET_BLOCK_INTERVAL:
      return {
        ...state,
        blockInterval: action.payload,
      };

    case SET_TIME_RANGE:
      return {
        ...state,
        timeRange: action.payload,
      };

    case SET_BLOCK_SIZE:
      return {
        ...state,
        blockSize: action.payload,
      };

    case GET_TIMES:
      /** Divide block size by minutes in a day. Used to determine number of blocks */
      const numBlocks = 1440 / state.blockInterval;
      /** Convert timeRange to milliseconds*/
      const timeRangeToMs = state.timeRange.map((time) => {
        return state.startTime + time * 3600000;
      });

      /** Populate timeColumn array, between time ranges, with interval blockInterval */
      let blockedTimeColumn = [];
      blockedTimeColumn.push(timeRangeToMs[0]);
      let lastTime = timeRangeToMs[0];
      for (let i = 0; i < numBlocks; i++) {
        let newTime = lastTime + state.blockInterval * 60000;
        if (newTime >= timeRangeToMs[1]) break;
        blockedTimeColumn.push(newTime);
        lastTime = newTime;
      }
      blockedTimeColumn.push(timeRangeToMs[1]);

      return {
        ...state,
        timeColumn: blockedTimeColumn,
      };

    case SHIFT_DAYS:
      let newDayOrder = [
        state.dayColumns[state.dayColumns.length - 1],
        ...state.dayColumns.slice(0, state.dayColumns.length - 1),
      ];
      return {
        ...state,
        dayColumns: newDayOrder,
      };

    case ADD_TASK:
      const newDayColumns = [...state.dayColumns];
      newDayColumns.find((day) => {
        if (day.id === action.payload.dayOfWeek) {
          const newTasks = [...day.tasks, action.payload];
          day.tasks = newTasks;
        }
      });
      return {
        ...state,
        dayColumns: newDayColumns,
      };

    case DELETE_TASK: {
      const { cellKey, day } = action.payload;
      const filteredDayColumns = [...state.dayColumns];
      filteredDayColumns.find((col) => {
        if (col.id === day) {
          const newTasks = col.tasks.filter((task) => task.key !== cellKey);
          col.tasks = newTasks;
        }
      });
      return {
        ...state,
        dayColumns: filteredDayColumns,
      };
    }

    case CLEAR_TABLE:
      const clearedDayColumns = [...state.dayColumns];
      clearedDayColumns.map((col) => {
        col.tasks = [];
      });
      return {
        ...state,
        dayColumns: clearedDayColumns,
      };

    default:
      return state;
  }
};

export default table_reducer;
