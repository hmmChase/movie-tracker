import { doFetch } from './doFetch';

export const fetchFavoriteData = async user_id => {
  const url = `/api/users/${user_id}/favorites`;
  const favoritesList = await doFetch(url);
  return favoritesList.data;
};
