import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { MovieContainer } from '../MovieContainer/MovieContainer';
import { Header } from '../Header/Header';
import { connect } from 'react-redux';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path='/' component={MovieContainer} />
        <Route path='/favorites' component={MovieContainer} />
      </div>
    );
  }
}