import { SET_TASK_DESCRIPTION, SET_TASK_TITLE } from './actions';

const task_reducer = (state, action) => {
  switch (action.payload) {
    case SET_TASK_TITLE:
      console.log(action.payload)
      const newTitle = action.payload.newTitle;
      Object.values(state.dayColumns).map((col) => {
        if (col.id === action.payload.day && col.tasks.length > 0) {
          return col.tasks.map((task) => {
            if (task.key === action.payload.cellKey) {
              task.title = newTitle;
            } else return null;
          });
        } else return null;
      });
      return {
        ...state,
        title: newTitle,
      };
    case SET_TASK_DESCRIPTION:
      console.log(action.payload)
      return {
        ...state,
        description: action.payload,
      };
    default:
      return state;
  }
};

export default task_reducer;
