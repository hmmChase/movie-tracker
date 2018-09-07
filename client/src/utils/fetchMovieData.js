// import { apiKey } from '../private/apiKey';
import { doFetch } from './doFetch';

require('dotenv').config();
console.log(process.env.NODE_ENV);
console.log(process.env.API_KEY);
console.log(process.env.REACT_APP_API_KEY);

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchMovieData = async () => {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';
  const dirtyMovieData = await doFetch(url + apiKey);
  return cleanMovieData(dirtyMovieData.results);
};

export const cleanMovieData = movieData => {
  return movieData.map(movie => ({
    movie_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    overview: movie.overview
  }));
};
