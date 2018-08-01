import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import 'reset-css';
import './base.css';

//gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse()

const Root = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('app'));

module.hot.accept();
