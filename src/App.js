import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Route path='./login'>
        <Login />
      </Route>
      {/* This will be a private Route */}
      <Route path='/'>
        <Dashboard />
      </Route>
    </Router>
  );
}

export default App;
