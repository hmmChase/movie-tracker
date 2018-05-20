import { doFetch } from './doFetch';

export const fetchFavoriteData = async user_id => {
  const url = `http://localhost:3000/api/users/${user_id}/favorites`;
  const favoritesList = await doFetch(url);
  return favoritesList.data;
};

