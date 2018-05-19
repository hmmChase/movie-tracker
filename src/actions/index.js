export const addMovies = movies => ({
  type: 'ADD_MOVIES',
  movies
});

export const toggleLogin = () => ({
  type: 'TOGGLE_LOGIN'
});

export const storeUserData = ({ id, name }) => ({
  type: 'STORE_USER_DATA',
  id,
  name
});