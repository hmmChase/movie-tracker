import moviesReducer from '../moviesReducer';
import * as actions from  '../../actions';

describe('moviesReducer', () => {
  it('returns a default state', () => {
    let expected = [];

    expect(moviesReducer(undefined, {})).toEqual(expected);
  });

  it('returns a new state when called with a ADD_MOVIES action', () => {
    let movies = [{ title: 'some movie' }];
    let expected = movies;

    expect(moviesReducer(undefined, actions.addMovies(movies))).toEqual(expected);
  });
});
