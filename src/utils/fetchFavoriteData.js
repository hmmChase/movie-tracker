
import { doFetch } from './doFetch';

export const fetchFavorites = async userId => {
  const url = `http://localhost:3000/api/users/${userId}/favorites`;
  const favoritesList = await doFetch(url);

  return await cleanFavorites(favoritesList.data);
};

const cleanFavorites = favorites => {
  return favorites.map(favorite => ({
    movieId: favorite.movie_id,
    userId: favorite.user_id,
    title: favorite.title,
    posterPath: favorite.poster_path,
    releaseDate: favorite.release_date,
    voteAverage: favorite.vote_average,
    overview: favorite.overview
  }));
};