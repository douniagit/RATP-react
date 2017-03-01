import React from 'react';
import { Router, Route} from 'react-router';
import App from './App.js';
import Content2 from "./Content/Content2.jsx";

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/rer" component={Content2} />

  </Router>
);


export default Routes;
