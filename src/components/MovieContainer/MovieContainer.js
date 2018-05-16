import React, { Component } from 'react';
import './MovieContainer.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchMovieData } from '../../utils/fetchMovieData';
import { addMovies } from '../../actions';

class MovieContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieData: []
    };
  }

  getMovieData = async () => {
    const movieData = await fetchMovieData();
    this.props.addMovies(movieData);

    this.setState({
      movieData
    });
  };

  componentDidMount = () => {
    this.getMovieData();
  };

  render() {
    return (
      <main className="MovieContainer">
        <h1>Movies</h1>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies
});

const mapDispatchToProps = dispatch => ({
  addMovies: movies => dispatch(addMovies(movies))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
);
