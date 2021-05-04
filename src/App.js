import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PrivateRoute } from './pages/PrivateRoute';
import { AuthWrapper } from './pages/AuthWrapper';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute exact path='/'>
            <Dashboard />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
