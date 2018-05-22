import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  MovieContainer,
  mapStateToProps,
  mapDispatchToProps
} from './MovieContainer';
import { addMovies, loadFavorites } from '../../actions';
import { fetchMovieData } from '../../utils/fetchMovieData';
jest.mock('../../utils/fetchMovieData');
import { fetchAddFavorite } from '../../utils/fetchAddFavorite';
jest.mock('../../utils/fetchAddFavorite');
import { fetchFavoriteData } from '../../utils/fetchFavoriteData';
jest.mock('../../utils/fetchFavoriteData');
import { fetchRemoveFavorite } from '../../utils/fetchRemoveFavorite';
jest.mock('../../utils/fetchRemoveFavorite');

describe('MovieContainer', () => {
  let movieContainer;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {
      movies: [
        {
          movie_id: 147,
          poster_path: '/movie-path/poster.png',
          title: 'mock title',
          release_date: '12-45-68',
          vote_average: 5,
          overview: 'mock overview'
        }
      ],
      favorites: [
        {
          movie_id: 421,
          poster_path: '/movie-path/poster.png',
          title: 'mock title',
          release_date: '12-45-68',
          vote_average: 5,
          overview: 'mock overview'
        }
      ],
      loggedIn: false,
      userId: 1,
      addMovies: jest.fn(),
      loadFavorites: jest.fn(),
      location: { pathname: '/' }
    };

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

    it('calls addMovies action', async () => {
      await movieContainer.instance().getMovieData();

      expect(mockProps.addMovies).toHaveBeenCalledTimes(1);
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
  describe('checkIfFavorite', () => {
    it('returns false is if movie_id is not found in favorites', () => {
      const movie_id = 123;
      mockProps.favorites = [{ movie_id: 321 }];
      movieContainer = shallow(<MovieContainer {...mockProps} />, {
        disableLifecycleMethods: true
      });
      const checkIfFavorite = movieContainer
        .instance()
        .checkIfFavorite(movie_id);

      expect(checkIfFavorite).toBe(false);
    });

    it('returns true is if movie_id is found in favorites', () => {
      const movie_id = 123;
      mockProps.favorites = [{ movie_id: 123 }];
      movieContainer = shallow(<MovieContainer {...mockProps} />, {
        disableLifecycleMethods: true
      });
      const checkIfFavorite = movieContainer
        .instance()
        .checkIfFavorite(movie_id);

      expect(checkIfFavorite).toBe(true);
    });
  });

  describe('addFavorite', () => {
    it('calls fetchAddFavorite', async () => {
      await movieContainer.instance().addFavorite();

      expect(fetchAddFavorite).toHaveBeenCalledTimes(1);
    });

    it('calls fetchFavoriteData', async () => {
      await movieContainer.instance().addFavorite();

      expect(fetchFavoriteData).toHaveBeenCalledTimes(1);
    });

    it('calls loadFavorites', async () => {
      await movieContainer.instance().addFavorite();

      expect(mockProps.loadFavorites).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeFavorite', () => {
    it('calls fetchRemoveFavorite', async () => {
      await movieContainer.instance().removeFavorite();

      expect(fetchRemoveFavorite).toHaveBeenCalledTimes(1);
    });

    it('calls fetchFavoriteData', async () => {
      await movieContainer.instance().removeFavorite();

      expect(fetchFavoriteData).toHaveBeenCalledTimes(1);
    });

    it('calls loadFavorites', async () => {
      await movieContainer.instance().removeFavorite();

      expect(mockProps.loadFavorites).toHaveBeenCalledTimes(1);
    });
  });
  describe('movieCards', () => {
    it('returns MovieCard components for each movie', () => {
      const movieCards = movieContainer.instance().movieCards();

      expect(movieCards).toHaveLength(1);
    });

    it('returns MovieCard components for each favorite', () => {
      mockProps.location = { pathname: '/favorites' };
      movieContainer = shallow(<MovieContainer {...mockProps} />, {
        disableLifecycleMethods: true
      });
      const movieCards = movieContainer.instance().movieCards();

      expect(movieCards).toHaveLength(1);
    });
  });

  describe('mapStateToProps', () => {
    it('maps state properties to props', () => {
      const mockState = {
        movies: [],
        user: {
          loggedIn: false,
          id: 1,
          favorites: []
        }
      };
      const expected = {
        movies: [],
        loggedIn: false,
        userId: 1,
        favorites: []
      };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with the correct params on addMovies', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const movies = [];
      const mockAction = addMovies(movies);
      mappedProps.addMovies(movies);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('calls dispatch with the correct params on loadFavorites', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const favoritesArray = [];
      const mockAction = loadFavorites(favoritesArray);
      mappedProps.loadFavorites(favoritesArray);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
});
