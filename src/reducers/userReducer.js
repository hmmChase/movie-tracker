const initalState = {loggedIn: false};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN':
      return {loggedIn: !state.loggedIn};
    // break;
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
