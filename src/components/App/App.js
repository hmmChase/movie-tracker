import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';
import MovieContainer from '../../containers/MovieContainer/MovieContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={MovieContainer} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/favorites" component={MovieContainer} />
      </div>
    );
  }
}

export default App;
