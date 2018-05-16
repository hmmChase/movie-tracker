import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMovieData } from '../../utils/fetchMovieData';
import { addMovies } from '../../actions';
import { MovieCard } from '../MovieCard/MovieCard';
import './MovieContainer.css';

export class MovieContainer extends Component {
  getMovieData = async () => {
    const movieData = await fetchMovieData();
    this.props.addMovies(movieData);
  };

  componentDidMount = () => {
    this.getMovieData();
  };

  movieCards = () => {
    const movies = this.props.movies;

    return movies.map((movie) => 
      <MovieCard key={movie.movieId} {...movie} />
    );
  };

  render() {
    return (
      <main className="MovieContainer">
        {this.movieCards()}
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  movies: state.movies
});

export const mapDispatchToProps = dispatch => ({
  addMovies: movies => dispatch(addMovies(movies))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
);
