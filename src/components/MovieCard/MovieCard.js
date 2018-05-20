import React from 'react';
import './MovieCard.css';

const MovieCard = props => {
  const {
    movie_id,
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    toggleFavorite
  } = props;
  const baseUrl = 'https://image.tmdb.org/t/p/w200';
  const imageUrl = baseUrl + poster_path;

  return (
    <div className="MovieCard" id={movie_id}>
      <img src={imageUrl} alt="movie poster" />
      <button onClick={() => toggleFavorite(movie_id)}>Add to Favorites</button>
      <div className="card-body">
        <h2>{title}</h2>
        <p>
          <span className="bold-text">Release Date:</span> {release_date}
        </p>
        <p>
          <span className="bold-text">Vote Average:</span> {vote_average}
        </p>
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
