const initalState = [];

const moviesReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      return [...action.movies];
    default:
      return state;
  }
};

export default moviesReducer;
