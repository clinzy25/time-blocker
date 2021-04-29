import {
  SET_BLOCK_SIZE,
  GET_TIMES,
  SHIFT_DAYS,
  SET_TIME_RANGE,
} from './actions';

const table_reducer = (state, action) => {
  switch (action.type) {
    case SET_BLOCK_SIZE:
      return {
        ...state,
        blockSize: action.payload,
      };

    case SET_TIME_RANGE:
      return {
        ...state,
        timeRange: action.payload,
      };

    case GET_TIMES:
      /** Divide block size by minutes in a day */
      const numBlocks = 1440 / state.blockSize;
      /** Convert timeRange to milliseconds*/
      const timeRangeToMs = state.timeRange.map((time) => {
        return state.startTime + time * 3600000;
      });
      
      /** Populate timeColumn array, between time ranges, with interval blockSize */
      let blockedTimeColumn = [];
      blockedTimeColumn.push(timeRangeToMs[0]);
      let lastTime = timeRangeToMs[0];
      for (let i = 0; i < numBlocks; i++) {
        let newTime = lastTime + state.blockSize * 60000;
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
        state.dayOrder[state.dayOrder.length - 1],
        ...state.dayOrder.slice(0, state.dayOrder.length - 1),
      ];
      return {
        ...state,
        dayOrder: newDayOrder,
      };
    default:
      return state;
  }
};

export default table_reducer;
