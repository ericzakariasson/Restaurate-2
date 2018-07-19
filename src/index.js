import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'reset-css';
import './base.css';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();