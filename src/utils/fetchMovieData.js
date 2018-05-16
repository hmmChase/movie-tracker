import apiKey from '../private/apiKey';
// import { doFetch } from './doFetch';

// export const fetchMovieData = async () => {
//   const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';
//   const dirtyMovieData = await doFetch(url + apiKey);
//   return cleanMovieData(dirtyMovieData.results);
// };

// const cleanMovieData = dirtyMovieData => {
//   const cleanMovieData = dirtyMovieData.map(movie => {
//     return {
//       movie_id: movie.id,
//       title: movie.title,
//       poster_path: movie.poster_path,
//       release_date: movie.release_date,
//       vote_average: movie.vote_average,
//       overview: movie.overview
//     };
//   });
//   return cleanMovieData;
// };

export const fetchMovieData = async () => {
  const rootUrl = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
  try {
    const response = await fetch(
      `${rootUrl}&language=en-US&api_key=${apiKey}&language=en-US`
    );
    const nowPlayingData = await response.json();
    const cleanedMovies = cleanMovies(nowPlayingData);
    return cleanedMovies;
  } catch (error) {
    throw error;
  }
};

export const cleanMovies = movieData => {
  return movieData.results.map(movie => ({
    movie_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    overview: movie.overview
  }));
};
