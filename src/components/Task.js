import styled from 'styled-components';
import { useTableContext } from '../reducers-contexts/table_context';

export const Task = ({ cellKey }) => {
  const { tasks } = useTableContext();
  
  const task = tasks.find((task) => task.key === cellKey);
  if (task) {
    return <p>{task.key}</p>;
  } else {
    return null;
  }

};
const Wrapper = styled.div``;
