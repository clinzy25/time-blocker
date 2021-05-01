import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TableProvider } from './reducers-contexts/table_context';
import { TaskProvider } from './reducers-contexts/task_context';

ReactDOM.render(
  <React.StrictMode>
    <TableProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </TableProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
