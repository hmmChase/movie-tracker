import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movieId, posterPath, title, releaseDate, voteAverage, overview, toggleFavorite }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const imageUrl = baseUrl + posterPath;

  return (
    <div className="MovieCard" id={movieId}>
      <img src={imageUrl} alt="movie poster" />
      <h2>{title}</h2>
      <p>Release Date: {releaseDate}</p>
      <p>Vote Average: {voteAverage}</p>
      <p>Overview: {overview}</p>
      <button onClick={() => toggleFavorite(movieId)}>Add to Favorites</button>
    </div>
  );
};

export default MovieCard;