export const fetchAddFavorite = async (movie, user_id) => {
  try {
    const url = 'http://localhost:3000/api/users/favorites/new';
    const options = {
      method: 'POST',
      body: JSON.stringify({
        ...movie,
        user_id
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response;
  } catch (error) {
    throw new Error(`Network request failed. (error: ${error.message})`);
  }
};
