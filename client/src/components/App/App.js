import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';
import MovieContainer from '../../containers/MovieContainer/MovieContainer';
import './App.css';
require('dotenv').config();
console.log(process.env.NODE_ENV);
console.log(process.env.API_KEY);
console.log(process.env.REACT_APP_API_KEY);

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
