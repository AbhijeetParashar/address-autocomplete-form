import React, { Component } from 'react';
import './App.css';
import { Router, Route } from 'react-router'
import HomePage from "./layout/HomePage";
import history from './utils/History';

class App extends Component{
  render(){
    return(
      <div className="app" >
          <Router history={history}>
          <Route exact path="/" component={HomePage} />
        </Router>
      </div>
    )
  }
}

export default App;
