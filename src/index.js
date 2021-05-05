import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TableProvider } from './reducers-contexts/table_context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain='dev-jwfmg26d.us.auth0.com'
    clientId='a5Y9Cp6iQrFMnyGag85UlBXCyEk5KPxn'
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
