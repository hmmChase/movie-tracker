import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMovieData } from '../../utils/fetchMovieData';
import { fetchFavorites } from '../../utils/fetchFavoriteData';
import { fetchAddFavorite } from '../../utils/fetchAddFavorite';
import { fetchRemoveFavorite } from '../../utils/fetchRemoveFavorite';
import { addMovies, loadFavorites } from '../../actions';
import MovieCard from '../MovieCard/MovieCard';
import './MovieContainer.css';

export class MovieContainer extends Component {
  componentDidMount = () => {
    this.getMovieData();
  };

  getMovieData = async () => {
    const movieData = await fetchMovieData();

    this.props.addMovies(movieData);
  };

  toggleFavorite = movie_id => {
    if (this.props.loggedIn) {
      this.checkIfFavorite(movie_id)
        ? this.removeFavorite(this.props.userId, movie_id)
        : this.addFavorite(movie_id);
    } else {
      alert('You must be logged in to add favorites');
    }
  };

  checkIfFavorite = movie_id => {
    const favoritesArray = this.props.favorites;

    return favoritesArray.some(favorite => favorite.movie_id === movie_id);
  };

  addFavorite = async movie_id => {
    const foundMovie = this.props.movies.find(
      movie => movie.movie_id === movie_id
    );
    const userId = this.props.userId;
    await fetchAddFavorite(foundMovie, userId);
    const favoritesArray = await fetchFavorites(this.props.userId);
    this.props.loadFavorites(favoritesArray);
  };

  removeFavorite = async (userId, movieId) => {
    await fetchRemoveFavorite(userId, movieId);
    const favoritesArray = await fetchFavorites(this.props.userId);
    this.props.loadFavorites(favoritesArray);
  };

  movieCards = () => {
    const movies =
      this.props.location.pathname === '/favorites'
        ? this.props.favorites
        : this.props.movies;

    return movies.map(movie => (
      <MovieCard
        key={movie.movie_id}
        {...movie}
        toggleFavorite={this.toggleFavorite}
        isFavorite={this.checkIfFavorite}
      />
    ));
  };

  render() {
    return <main className="MovieContainer">{this.movieCards()}</main>;
  }
}

export const mapStateToProps = state => ({
  movies: state.movies,
  favorites: state.user.favorites,
  loggedIn: state.user.loggedIn,
  userId: state.user.id
});

export const mapDispatchToProps = dispatch => ({
  addMovies: movies => dispatch(addMovies(movies)),
  loadFavorites: favoritesArray => dispatch(loadFavorites(favoritesArray))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
);
