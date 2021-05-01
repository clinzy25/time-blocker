import React, { useContext, useReducer } from 'react';
import reducer from './task_reducer';
import { SET_TASK_DESCRIPTION, SET_TASK_TITLE } from './actions';

const initialState = {
  title: '',
  description: '',
};

const TaskContext = React.createContext();

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTaskTitle = (newTitle, cellKey, day) => {
    dispatch({ type: SET_TASK_TITLE, payload: { newTitle, cellKey, day } });
  };

  const setTaskDescription = (newDescription, cellKey, day) => {
    console.log(newDescription, cellKey, day);
    dispatch({
      type: SET_TASK_DESCRIPTION,
      payload: { newDescription, cellKey, day },
    });
  };

  return (
    <TaskContext.Provider
      value={{ ...state, setTaskTitle, setTaskDescription }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => useContext(TaskContext);

export { useTaskContext, TaskProvider };
