import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';

const MovieCard = props => {
  const {
    movie_id,
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    toggleFavorite,
    isFavorite
  } = props;
  const baseUrl = 'https://image.tmdb.org/t/p/w200';
  const imageUrl = baseUrl + poster_path;
  const styleToggle = isFavorite(movie_id) ? 'favorited' : '';

  return (
    <div className={`MovieCard ${styleToggle}`} id={movie_id}>
      <img src={imageUrl} alt="movie poster" />
      <div className="favoriteToggle" onClick={() => toggleFavorite(movie_id)}>
        _
      </div>
      <div className="cardBody">
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

MovieCard.propTypes = {
  movie_id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired
};

export default MovieCard;
