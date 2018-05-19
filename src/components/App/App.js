import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import MovieContainer from '../MovieContainer/MovieContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={MovieContainer} />
        <Route path="/favorites" component={MovieContainer} />
      </div>
    );
  }
}

export default App;
