import React from 'react';
import './MovieCard.css';

const MovieCard = props => {
  const {
    movieId,
    posterPath,
    title,
    releaseDate,
    voteAverage,
    overview,
    toggleFavorite
  } = props;
  const baseUrl = 'https://image.tmdb.org/t/p/w200';
  const imageUrl = baseUrl + posterPath;

  return (
    <div className="MovieCard" id={movieId}>
      <img src={imageUrl} alt="movie poster" />
      <div clasName="card-body">
        <h2>{title}</h2>
        <p>Release Date: {releaseDate}</p>
        <p>Vote Average: {voteAverage}</p>
        <p>
          {overview.length > 100
            ? overview.substring(0, 100) + '...'
            : overview}
        </p>
        <button onClick={() => toggleFavorite(movieId)}>
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
