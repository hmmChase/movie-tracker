export const fetchRemoveFavorite = async (user_id, movie_id) => {
  const url = `http://localhost:3000/api/users/${user_id}/favorites/${movie_id}`;
  const options = { method: 'DELETE' };
  await fetch(url, options);
};
