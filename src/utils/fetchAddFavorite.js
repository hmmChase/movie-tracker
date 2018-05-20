export const fetchAddFavorite = async (movie, user_id) => {
  const url = 'http://localhost:3000/api/users/favorites/new';
  const options = {
    method: 'POST',
    body: JSON.stringify({
      ...movie,
      user_id
    }),
    headers: { 'Content-Type': 'application/json' }
  };
  return await fetch(url, options);
};
