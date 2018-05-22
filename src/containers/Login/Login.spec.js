import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapStateToProps, mapDispatchToProps } from './Login';
import { toggleLogin, storeUserData, loadFavorites } from '../../actions/';
import { fetchUserData } from '../../utils/fetchUserData';
jest.mock('../../utils/fetchUserData');
import { fetchFavoriteData } from '../../utils/fetchFavoriteData';
jest.mock('../../utils/fetchFavoriteData');

describe('Login', () => {
  let login;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      loggedIn: false,
      favorites: [],
      toggleLogin: jest.fn(),
      storeUserData: jest.fn(),
      loadFavorites: jest.fn(),
      history: { push: jest.fn() }
    };
    login = shallow(<Login {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(login).toMatchSnapshot();
  });

  describe('handleChange', () => {
    it('sets state.email on change of the email input', () => {
      const mockEvent = {
        target: {
          name: 'email',
          value: 'mock@email.com'
        }
      };
      login.instance().handleChange(mockEvent);

      expect(login.state()).toEqual({ email: 'mock@email.com', password: '' });
    });

    it('sets state.password on change of the password input', () => {
      const mockEvent = {
        target: {
          name: 'password',
          value: 'password'
        }
      };
      login.instance().handleChange(mockEvent);

      expect(login.state()).toEqual({ email: '', password: 'password' });
    });
  });

  describe('handleSubmit', () => {
    it('call fetchUserData', async () => {
      const mockEvent = { preventDefault: jest.fn() };
      const userData = {
        data: [
          {
            id: 1,
            name: 'Taylor',
            password: 'password',
            email: 'tman2272@aol.com'
          }
        ]
      };
      fetchUserData.mockImplementation(() => Promise.resolve(userData));
      await login.instance().handleSubmit(mockEvent);

      expect(fetchUserData).toHaveBeenCalledTimes(1);
    });

    it('call alert if user is not found', async () => {
      login.setState({ email: 'asdf@aol.com' });
      const mockEvent = { preventDefault: jest.fn() };
      window.alert = jest.fn();
      const userData = {
        data: [
          {
            id: 1,
            name: 'Taylor',
            password: 'password',
            email: 'tman2272@aol.com'
          }
        ]
      };
      fetchUserData.mockImplementation(() => Promise.resolve(userData));
      await login.instance().handleSubmit(mockEvent);

      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('No such user');
    });

    it("calls alert user is found, but password doesn't match", async () => {
      login.setState({ email: 'tman2272@aol.com', password: 'asdf' });
      const mockEvent = { preventDefault: jest.fn() };
      window.alert = jest.fn();
      const userData = {
        data: [
          {
            id: 1,
            name: 'Taylor',
            password: 'password',
            email: 'tman2272@aol.com'
          }
        ]
      };
      fetchUserData.mockImplementation(() => Promise.resolve(userData));
      await login.instance().handleSubmit(mockEvent);

      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('Incorrect Password');
    });

    it('calls fetchFavoriteData is user is validated', async () => {
      login.setState({ email: 'tman2272@aol.com', password: 'password' });
      const mockEvent = { preventDefault: jest.fn() };
      window.alert = jest.fn();
      const userData = {
        data: [
          {
            id: 1,
            name: 'Taylor',
            password: 'password',
            email: 'tman2272@aol.com'
          }
        ]
      };
      fetchUserData.mockImplementation(() => Promise.resolve(userData));
      await login.instance().handleSubmit(mockEvent);

      expect(fetchFavoriteData).toHaveBeenCalledTimes(1);
    });

    it('calls toggleLogin is user is validated', async () => {
      login.setState({ email: 'tman2272@aol.com', password: 'password' });
      const mockEvent = { preventDefault: jest.fn() };
      window.alert = jest.fn();
      const userData = {
        data: [
          {
            id: 1,
            name: 'Taylor',
            password: 'password',
            email: 'tman2272@aol.com'
          }
        ]
      };
      fetchUserData.mockImplementation(() => Promise.resolve(userData));
      await login.instance().handleSubmit(mockEvent);

      expect(mockProps.toggleLogin).toHaveBeenCalledTimes(1);
    });

    it('calls storeUserData is user is validated', async () => {
      login.setState({ email: 'tman2272@aol.com', password: 'password' });
      const mockEvent = { preventDefault: jest.fn() };
      window.alert = jest.fn();
      const userData = {
        data: [
          {
            id: 1,
            name: 'Taylor',
            password: 'password',
            email: 'tman2272@aol.com'
          }
        ]
      };
      const foundUser = {
        id: 1,
        name: 'Taylor',
        password: 'password',
        email: 'tman2272@aol.com'
      };
      fetchUserData.mockImplementation(() => Promise.resolve(userData));
      await login.instance().handleSubmit(mockEvent);

      expect(mockProps.storeUserData).toHaveBeenCalledTimes(1);
      expect(mockProps.storeUserData).toHaveBeenCalledWith(foundUser);
    });

    it('calls loadFavorites is user is validated', async () => {
      login.setState({ email: 'tman2272@aol.com', password: 'password' });
      const mockEvent = { preventDefault: jest.fn() };
      window.alert = jest.fn();
      const userData = {
        data: [
          {
            id: 1,
            name: 'Taylor',
            password: 'password',
            email: 'tman2272@aol.com'
          }
        ]
      };
      const foundUser = {
        id: 1,
        name: 'Taylor',
        password: 'password',
        email: 'tman2272@aol.com'
      };
      const favoritesArray = [];
      fetchUserData.mockImplementation(() => Promise.resolve(userData));
      fetchFavoriteData.mockImplementation(() =>
        Promise.resolve(favoritesArray)
      );
      await login.instance().handleSubmit(mockEvent);

      expect(mockProps.loadFavorites).toHaveBeenCalledTimes(1);
      expect(mockProps.loadFavorites).toHaveBeenCalledWith(favoritesArray);
    });

    it('calls loadFavorites is user is validated', async () => {
      login.setState({ email: 'tman2272@aol.com', password: 'password' });
      const mockEvent = { preventDefault: jest.fn() };
      window.alert = jest.fn();
      const userData = {
        data: [
          {
            id: 1,
            name: 'Taylor',
            password: 'password',
            email: 'tman2272@aol.com'
          }
        ]
      };
      const foundUser = {
        id: 1,
        name: 'Taylor',
        password: 'password',
        email: 'tman2272@aol.com'
      };
      const favoritesArray = [];
      fetchUserData.mockImplementation(() => Promise.resolve(userData));
      fetchFavoriteData.mockImplementation(() =>
        Promise.resolve(favoritesArray)
      );
      await login.instance().handleSubmit(mockEvent);

      expect(mockProps.history.push).toHaveBeenCalledTimes(1);
      expect(mockProps.history.push).toHaveBeenCalledWith('/');
    });
  });

  describe('mapStateToProps', () => {
    it('should map state properties to props', () => {
      const mockState = {
        user: {
          loggedIn: false,
          favorites: []
        }
      };
      const expected = {
        loggedIn: false,
        favorites: []
      };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch on toggleLogin', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = toggleLogin();
      mappedProps.toggleLogin();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('calls dispatch with the correct params on storeUserData', () => {
      const mockDispatch = jest.fn();
      const userData = {};
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = storeUserData(userData);
      mappedProps.storeUserData(userData);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('calls dispatch with the correct params on loadFavorites', () => {
      const mockDispatch = jest.fn();
      const mockFavoritesArray = [];
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = loadFavorites(mockFavoritesArray);
      mappedProps.loadFavorites(mockFavoritesArray);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
});
