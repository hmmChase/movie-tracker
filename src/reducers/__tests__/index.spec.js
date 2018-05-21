import { combineReducers, createStore } from 'redux';
import rootReducer from '../index';
import moviesReducer from '../moviesReducer';
import userReducer from '../userReducer';

const store = createStore(rootReducer);

describe('rootReducer', () => {
  it('checks that the intial state of the root reducer matches what the child reducer returns, given an empty action', () => {
    expect(store.getState().movies).toEqual(moviesReducer([], {}));
    expect(store.getState().user).toEqual(
      userReducer({ loggedIn: false, favorites: [] }, {})
    );
  });
});
