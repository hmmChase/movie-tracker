import React from 'react';
import { shallow } from 'enzyme';
import { Header, mapStateToProps, mapDispatchToProps } from './Header';
import { toggleLogin, loadFavorites } from '../../actions/';
jest.mock('../../utils/fetchFavoriteData');

describe('Header', () => {
  let header;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      loggedIn: false,
      name: 'mock name',
      userId: 1,
      toggleLogin: jest.fn(),
      loadFavorites: jest.fn()
    };
    header = shallow(<Header {...mockProps} />);
  });

  it('matches snapshot with user loggedIn true', () => {
    mockProps.loggedIn = true;
    header = shallow(<Header {...mockProps} />);

    expect(header).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should map state properties to props', () => {
      const mockState = {
        user: {
          loggedIn: false,
          name: 'mock name',
          id: 1
        }
      };
      const expected = {
        loggedIn: false,
        name: 'mock name',
        userId: 1
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
