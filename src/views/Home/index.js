import React, { Component } from 'react';

import { AUTH_TOKEN } from '../../constants';


import Dashboard from '../Dashboard';
import NotAuthenticated from './NotAuthenticated';

class Home extends Component {

  state = {
    isAuthenticated: false,
  }

  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  signout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    this.setState({ isAuthenticated: false });
  }

  checkAuth = () => {
    const token = localStorage.getItem(AUTH_TOKEN);
    const { isAuthenticated } = this.state;

    if (token && !isAuthenticated) {
      this.setState({ isAuthenticated: true })
    }
  }

  render() {
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Dashboard onSignout={this.signout} />
    } else {
      return <NotAuthenticated />
    }
  }
}

export default Home;