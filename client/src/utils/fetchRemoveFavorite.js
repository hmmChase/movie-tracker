export const fetchRemoveFavorite = async (user_id, movie_id) => {
  try {
    const url = `/api/users/${user_id}/favorites/${movie_id}`;
    const options = { method: 'DELETE' };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response;
  } catch (error) {
    throw new Error(`Network request failed. (error: ${error.message})`);
  }
};
