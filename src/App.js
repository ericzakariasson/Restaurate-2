import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './views/Home';
import NewVisit from './views/NewVisit';

const theme = {
  main: '#FFD14C',
  action: '#6C3EAD',
  visits: '#FFD14C',
  places: '#1E6699',
  fonts: {
    display: 'Playfair Display'
  },
  boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
  inputShadow: '0 4px 4px rgba(32, 9, 64, 0.08);'
}

const App = () => {
  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/nytt" component={NewVisit} />
            <Route path="/" component={Home} />
          </Switch>
        </ThemeProvider>
      </Router>
    </div>
  )
}

export default App;