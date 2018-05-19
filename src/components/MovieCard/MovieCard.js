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
      <button onClick={() => toggleFavorite(movieId)}>
        Add to Favorites
      </button>
      <div className="card-body">
        <h2>{title}</h2>
        <p><span className="bold-text">Release Date:</span> {releaseDate}</p>
        <p><span className="bold-text">Vote Average:</span> {voteAverage}</p>
        <p>
          {overview.length > 100
            ? overview.substring(0, 100) + '...'
            : overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
