import userReducer from '../userReducer';
import * as actions from '../../actions';

describe('userReducer', () => {
  it('returns a default state', () => {
    let expected = {
      loggedIn: false,
      favorites: []
    };

    expect(userReducer(undefined, {})).toEqual(expected);
  });

  it('returns a new state when called with TOGGLE_LOGIN action', () => {
    let expected = {
      loggedIn: true,
      favorites: []
    };
    
    expect(userReducer(undefined, actions.toggleLogin())).toEqual(expected);
  });

  it('returns a new state when called with STORE_USER_DATA action', () => {
    let id = 1;
    let name = 'gizmo';
    
    let expected = {
      loggedIn: false,
      favorites: [],
      id: 1,
      name: 'gizmo'
    };

    expect(userReducer(undefined, actions.storeUserData({id, name}))).toEqual(expected);
  });

  it('returns a new state when called with LOAD_FAVORITES action', () => {
    let favorites = [{ movie: 'marvel' }];
    let expected = {
      loggedIn: false,
      favorites: [{ movie: 'marvel' }]
    };

    expect(userReducer(undefined, actions.loadFavorites(favorites))).toEqual(expected);
  });
});
