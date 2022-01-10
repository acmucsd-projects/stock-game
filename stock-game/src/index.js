import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserContext from './components/UserContext/UserContext';
import User from './components/UserContext/User';
ReactDOM.render(
  <React.StrictMode>
    <UserContext.Provider value={new User()}>
      <App />
    </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
