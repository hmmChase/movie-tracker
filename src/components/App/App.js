import React, { Component } from 'react';
import getMovieData from '../../utils/apiCall';
import { MovieCard } from '../MovieCard/MovieCard';
import './App.css';

class App extends Component {
  async foo() {
    const dirtyMovieData = await getMovieData();
    const cleanMovieData = dirtyMovieData.results;
  }

  render() {
    return (
      <div className="App">
        REACT YO FACE!
      </div>
    );
  }
}

export default App;
