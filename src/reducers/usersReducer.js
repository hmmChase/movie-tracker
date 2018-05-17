const initalState = {loggedIn: false};

const usersReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN':
      return {loggedIn: !state.loggedIn};
    // break;
    default:
      return state;
  }
};

export default usersReducer;
