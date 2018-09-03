import React from 'react';
import { shallow } from 'enzyme';
import { SignUp, mapDispatchToProps } from './SignUp';
import { toggleLogin, storeUserData } from '../../actions/';
import { fetchAddUser } from '../../utils/fetchAddUser';
jest.mock('../../utils/fetchAddUser');
import { fetchUserData } from '../../utils/fetchUserData';
jest.mock('../../utils/fetchUserData');

describe('SignUp', () => {
  let signUp;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {
      toggleLogin: jest.fn(),
      storeUserData: jest.fn(),
      history: { push: jest.fn() }
    };
    signUp = shallow(<SignUp {...mockProps} />);
  });

  it('matches snapshot', () => {
    expect(signUp).toMatchSnapshot();
  });

  describe('handleChange', () => {
    it('sets state.name with value of name input', () => {
      const mockEvent = {
        target: {
          name: 'name',
          value: 'mock name'
        }
      };
      signUp.instance().handleChange(mockEvent);
      const results = { name: 'mock name', email: '', password: '' };

      expect(signUp.state()).toEqual(results);
    });

    it('sets state.email on change of the email input', () => {
      const mockEvent = {
        target: {
          name: 'email',
          value: 'mock@email.com'
        }
      };
      const results = { name: '', email: 'mock@email.com', password: '' };
      signUp.instance().handleChange(mockEvent);
      expect(signUp.state()).toEqual(results);
    });

    it('sets state.password on change of the password input', () => {
      const mockEvent = {
        target: {
          name: 'password',
          value: 'password'
        }
      };
      signUp.instance().handleChange(mockEvent);
      const results = { name: '', email: '', password: 'password' };
      expect(signUp.state()).toEqual(results);
    });
  });

  describe('handleSubmit', () => {
    it('calls findUser', () => {
      const mockEvent = { preventDefault: jest.fn() };
      const findUser = (signUp.instance().findUser = jest.fn());
      signUp.instance().addUser = jest.fn();
      signUp.instance().handleSubmit(mockEvent);

      expect(findUser).toHaveBeenCalledTimes(1);
    });

    it('calls alert if findUser is true', async () => {
      const mockEvent = { preventDefault: jest.fn() };
      window.alert = jest.fn();
      signUp.instance().findUser = jest.fn().mockImplementation(() => true);
      await signUp.instance().handleSubmit(mockEvent);

      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('This email is already in use');
    });

    it('calls addUser if findUser is false', async () => {
      const mockEvent = { preventDefault: jest.fn() };
      signUp.instance().findUser = jest.fn().mockImplementation(() => false);
      const addUser = (signUp.instance().addUser = jest.fn());
      await signUp.instance().handleSubmit(mockEvent);

      expect(addUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('addUser', () => {
    it('calls fetchAddUser with correct params', () => {
      const mockState = { email: '', name: '', password: '' };
      signUp.instance().findUser = jest.fn();
      signUp.instance().addUser();

      expect(fetchAddUser).toHaveBeenCalledTimes(1);
      expect(fetchAddUser).toHaveBeenCalledWith(mockState);
    });

    it('calls fetchUserData', async () => {
      signUp.instance().findUser = jest.fn();
      await signUp.instance().addUser();

      expect(fetchUserData).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUser', () => {
    it('calls fetchUserData', () => {
      signUp.setState({
        email: 'dave@aol.com'
      });
      const userData = {
        data: [{ id: 1, name: 'dave', email: 'dave@aol.com' }]
      };
      fetchUserData.mockImplementation(() => userData);
      signUp.instance().findUser();

      expect(fetchUserData).toHaveBeenCalledTimes(1);
    });

    it('returns a user object', async () => {
      signUp.setState({
        email: 'dave@aol.com'
      });
      const userData = {
        data: [{ id: 1, name: 'dave', email: 'dave@aol.com' }]
      };
      const expected = { email: 'dave@aol.com', id: 1, name: 'dave' };
      fetchUserData.mockImplementation(() => userData);

      expect(await signUp.instance().findUser()).toEqual(expected);
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
  });
});
