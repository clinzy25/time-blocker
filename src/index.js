import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TableProvider } from './reducers-contexts/table_context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <React.StrictMode>
      <TableProvider>
        <App />
      </TableProvider>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
