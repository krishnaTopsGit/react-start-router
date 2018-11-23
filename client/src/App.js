import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { Router, Route } from 'react-router';
import history from './history';

// import {browserHistory} from 'react-router-dom'

import List from './components/List'
import Add from './components/Add'
import Edit from './components/Edit'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={List}></Route>
        <Route path="/add" component={Add}></Route>
        <Route path="/edit" component={Edit}></Route>
      </Router>
    );
  }
}

export default App;
