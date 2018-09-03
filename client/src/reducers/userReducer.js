const initalState = {
  loggedIn: false,
  favorites: []
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN':
      return {
        ...state,
        loggedIn: !state.loggedIn
      };
    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.favorites
      };
    case 'STORE_USER_DATA':
      return {
        ...state,
        id: action.id,
        name: action.name
      };
    default:
      return state;
  }
};

export default userReducer;
