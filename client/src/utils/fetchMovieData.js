import { apiKey } from '../private/apiKey';
import { doFetch } from './doFetch';

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
