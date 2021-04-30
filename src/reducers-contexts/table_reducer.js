import {
  SET_BLOCK_INTERVAL,
  GET_TIMES,
  SHIFT_DAYS,
  SET_TIME_RANGE,
  ADD_TASK,
  SET_BLOCK_SIZE,
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
        blockSize: action.payload
      }

    case GET_TIMES:
      /** Divide block size by minutes in a day */
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

    // case SHIFT_DAYS:
    //   let newDayOrder = [
    //     state.dayColumns[state.dayColumns.length - 1],
    //     ...state.dayColumns.slice(0, state.dayColumns.length - 1),
    //   ];
    //   return {
    //     ...state,
    //     dayColumns: newDayOrder,
    //   };

    case ADD_TASK:
      const newDayColumns = { ...state.dayColumns };
      for (let i in newDayColumns) {
        if (newDayColumns[i].id === action.payload.dayOfWeek) {
          const newTaskIds = [...newDayColumns[i].tasks, action.payload];
          newDayColumns[i].tasks = newTaskIds;
        }
      }
      return {
        ...state,
        dayColumns: newDayColumns,
      };
      
    default:
      return state;
  }
};

export default table_reducer;
