import React, { useReducer, useContext } from 'react';
import reducer from './table_reducer';

const TableContext = React.createContext();

const initialState = {
  loading: false,
  isLoggedIn: false,
};

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <TableContext.Provider value={{ ...state }}>
      {children}
    </TableContext.Provider>
  );
};

const useTableContext = () => useContext(TableContext);

export { useTableContext, TableProvider };
