import apiKey from '../private/apiKey';
import { doFetch } from './doFetch';

export const fetchMovieData = async () => {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';

  const dirtyMovieData = await doFetch(url + apiKey);
  return cleanMovieData(dirtyMovieData.results);
};

export const cleanMovieData = movieData => {
  return movieData.map(movie => ({
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    overview: movie.overview
  }));
};
