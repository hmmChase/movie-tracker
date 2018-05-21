import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  MovieContainer,
  mapStateToProps,
  mapDispatchToProps
} from './MovieContainer';
import { addMovies } from '../../actions';
import { fetchMovieData } from '../../utils/fetchMovieData';
jest.mock('../../utils/fetchMovieData');

describe('MovieContainer', () => {
  let movieContainer;
  let mockAddMovies;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {
      movies: [],
      favorites: [],
      loggedIn: false,
      userId: 1,
      addMovies: jest.fn(),
      loadFavorites: jest.fn(),
      location: {}
    };
    mockAddMovies = jest.fn();

    movieContainer = shallow(<MovieContainer {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches the snapshot', () => {
    expect(movieContainer).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls getMovieData', () => {
      const mockGetMovieData = (movieContainer.instance().getMovieData = jest.fn());
      movieContainer.instance().componentDidMount();

      expect(mockGetMovieData).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMovieData', () => {
    it('calls fetchMovieData', () => {
      movieContainer.instance().getMovieData();

      expect(fetchMovieData).toHaveBeenCalledTimes(1);
    });

    it.skip('calls addMovies action', async () => {
      fetchMovieData.mockImplementation(() => 1);
      console.log(fetchMovieData);
      // console.log(movieContainer.instance().props);
      const addMoviesProp = movieContainer.instance().props.addMovies;
      console.log(addMoviesProp);
      await movieContainer.instance().getMovieData;

      expect(addMoviesProp).toHaveBeenCalledTimes(1);
    });
  });
  describe('toggleFavorite', () => {
    it('if loggedIn is true, and checkIfFavorite is true, calls removeFavorite , ', () => {
      mockProps.loggedIn = true;
      movieContainer = shallow(<MovieContainer {...mockProps} />, {
        disableLifecycleMethods: true
      });
      const checkIfFavorite = (movieContainer.instance().checkIfFavorite = jest
        .fn()
        .mockImplementation(() => true));
      const removeFavorite = (movieContainer.instance().removeFavorite = jest.fn());

      movieContainer.instance().toggleFavorite();

      expect(removeFavorite).toHaveBeenCalledTimes(1);
    });

    it('if loggedIn is true, and checkIfFavorite is false, calls addFavorite, ', () => {
      mockProps.loggedIn = true;
      movieContainer = shallow(<MovieContainer {...mockProps} />, {
        disableLifecycleMethods: true
      });
      const checkIfFavorite = (movieContainer.instance().checkIfFavorite = jest.fn());
      const addFavorite = (movieContainer.instance().addFavorite = jest.fn());
      movieContainer.instance().toggleFavorite();

      expect(checkIfFavorite).toHaveBeenCalledTimes(1);
      expect(addFavorite).toHaveBeenCalledTimes(1);
    });

    it('calls alert if user loggedIn is false', () => {
      window.alert = jest.fn();
      movieContainer.instance().toggleFavorite();

      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(
        'You must be logged in to add favorites'
      );
    });
  });
  describe('checkIfFavorite', () => {});
  describe('addFavorite', () => {});
  describe('removeFavorite', () => {});
  describe('movieCards', () => {});
});
