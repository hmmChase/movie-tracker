import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMovieData } from '../../utils/fetchMovieData';
import { addMovies } from '../../actions';
import MovieCard from '../MovieCard/MovieCard';
import { fetchFavorites } from '../../utils/fetchFavoriteData';
import './MovieContainer.css';

export class MovieContainer extends Component {
  getMovieData = async () => {
    const movieData = await fetchMovieData();
    
    this.props.addMovies(movieData);
  };

  toggleFavorite = (movieId) => {
    if (this.props.loggedIn) {
      this.checkIfFavorite(movieId) ? this.addFavorite(movieId) : this.removeFavorite();
    } else {
      alert('You must be logged in to add favorites');
    }
  };

  checkIfFavorite = async movieId => {
    const favoritesArray = await fetchFavorites(this.props.id);

    return favoritesArray.find(favorite => favorite.movieId === movieId);
  };

  addFavorite = (movieId) => {
    const url = 'http://localhost:3000/api/users/favorites/new';
    const findMovie = this.props.movies.find(movie => movie.movieId === movieId);
    const options = {
      method: 'POST',
      body: JSON.stringify({
        movie_id: findMovie.movieId, 
        user_id: this.props.id, 
        title: findMovie.title,
        poster_path: findMovie.posterPath,
        release_date: findMovie.releaseDate,
        vote_average: findMovie.voteAverage,
        overview: findMovie.overview
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, options);
  };

  componentDidMount = async () => {
    this.getMovieData();
  };

  favoriteCards = () => {
    
  }

  movieCards = () => {
    const movies = this.props.movies;

    return movies.map((movie) => 
      <MovieCard key={movie.movieId} {...movie} toggleFavorite={this.toggleFavorite} />
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
  movies: state.movies,
  loggedIn: state.user.loggedIn,
  id: state.user.id
});

export const mapDispatchToProps = dispatch => ({
  addMovies: movies => dispatch(addMovies(movies))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
);