import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movieId, posterPath, title, releaseDate, voteAverage, overview, loggedIn }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const imageUrl = baseUrl + posterPath;

  const addToFavorites = () => {
    console.log(loggedIn)
    // check if loggedIn is true
    // if false alert(you must be signed in / a user to add favorites)
    // if true- 
    // check database -> fetch user
    // map over favorites check if movie already exists
    // if true alert(this movie is already favorited)
    // if false add this movie to the database
  };

  return (
    <div className="MovieCard" id={movieId}>
      <img src={imageUrl} alt="movie poster" />
      <h2>{title}</h2>
      <p>Release Date: {releaseDate}</p>
      <p>Vote Average: {voteAverage}</p>
      <p>Overview: {overview}</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default MovieCard;