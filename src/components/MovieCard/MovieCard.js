import React from 'react';
import './MovieCard.css';

<<<<<<< HEAD
const MovieCard = ({ movieId, posterPath, title, releaseDate, voteAverage, overview, toggleFavorite }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
=======
export const MovieCard = props => {
  const {
    movieId,
    posterPath,
    title,
    releaseDate,
    voteAverage,
    overview
  } = props;
  const baseUrl = 'https://image.tmdb.org/t/p/w200';
>>>>>>> Truncate movie overview
  const imageUrl = baseUrl + posterPath;

  return (
    <div className="MovieCard" id={movieId}>
      <img src={imageUrl} alt="movie poster" />
<<<<<<< HEAD
      <h2>{title}</h2>
      <p>Release Date: {releaseDate}</p>
      <p>Vote Average: {voteAverage}</p>
      <p>Overview: {overview}</p>
      <button onClick={() => toggleFavorite(movieId)}>Add to Favorites</button>
    </div>
  );
};

export default MovieCard;
=======
      <div clasName="card-body">
        <h2>{title}</h2>
        <p>Release Date: {releaseDate}</p>
        <p>Vote Average: {voteAverage}</p>
        <p>
          {overview.length > 100
            ? overview.substring(0, 100) + '...'
            : overview}
        </p>
      </div>
    </div>
  );
};
>>>>>>> Truncate movie overview
