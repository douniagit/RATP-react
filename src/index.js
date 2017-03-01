import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {browserHistory} from 'react-router';
import Routes from './Routes.js';


ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);

