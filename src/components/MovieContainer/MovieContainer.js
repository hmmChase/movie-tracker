import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMovieData } from '../../utils/fetchMovieData';
import { fetchFavorites } from '../../utils/fetchFavoriteData';
import { addMovies, loadFavorites } from '../../actions';
import MovieCard from '../MovieCard/MovieCard';
import './MovieContainer.css';

export class MovieContainer extends Component {
  getMovieData = async () => {
    const movieData = await fetchMovieData();
    
    this.props.addMovies(movieData);
  };

  toggleFavorite = movieId => {
    if (this.props.loggedIn) {
      this.checkIfFavorite(movieId) ? this.removeFavorite(this.props.userId, movieId) : this.addFavorite(movieId);
    } else {
      alert('You must be logged in to add favorites');
    }
  };

  checkIfFavorite = movieId => {
    const favoritesArray = this.props.favorites;

    return favoritesArray.some(favorite => favorite.movieId === movieId);
  };

  addFavorite = async movieId => {
    const url = 'http://localhost:3000/api/users/favorites/new';
    const findMovie = this.props.movies.find(movie => movie.movieId === movieId);
    const options = {
      method: 'POST',
      body: JSON.stringify({
        movie_id: findMovie.movieId,
        user_id: this.props.userId,
        title: findMovie.title,
        poster_path: findMovie.posterPath,
        release_date: findMovie.releaseDate,
        vote_average: findMovie.voteAverage,
        overview: findMovie.overview
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    await fetch(url, options);
    const favoritesArray = await fetchFavorites(this.props.userId);

    this.props.loadFavorites(favoritesArray);
  };

  removeFavorite = async (userId, movieId) => {
    const url = `http://localhost:3000/api/users/${userId}/favorites/${movieId}`;;
    const options = { method: 'DELETE' };

    await fetch(url, options);
    
    const favoritesArray = await fetchFavorites(this.props.userId);

    this.props.loadFavorites(favoritesArray);
  };

  componentDidMount = () => {
    this.getMovieData();
  };


  movieCards = () => {
    const movies = 
    this.props.location.pathname === '/favorites'
      ? this.props.favorites
      : this.props.movies

    return movies.map(movie => 
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
  favorites: state.user.favorites,
  loggedIn: state.user.loggedIn,
  userId: state.user.id
});

export const mapDispatchToProps = dispatch => ({
  addMovies: movies => dispatch(addMovies(movies)),
  loadFavorites: (userId) => dispatch(loadFavorites(userId))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
);