import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import './App.css';
import { Header } from '../Header/Header';
import MovieContainer from '../MovieContainer/MovieContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={MovieContainer} />
      </div>
    );
  }
}

export default App;
