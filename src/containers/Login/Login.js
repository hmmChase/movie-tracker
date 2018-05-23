import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData } from '../../utils/fetchUserData';
import { fetchFavoriteData } from '../../utils/fetchFavoriteData';
import { toggleLogin, storeUserData, loadFavorites } from '../../actions';
import './Login.css';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const userData = await fetchUserData();
    const foundUser = userData.data.find(
      user => user.email === this.state.email.toLowerCase()
    );

    if (this.state.email === "") {
      alert('Please enter an email address');
    } else if (!foundUser) {
      alert('No such user');
    } else if (foundUser.password === this.state.password) {
      const favoritesArray = await fetchFavoriteData(foundUser.id);
      this.props.toggleLogin();
      this.props.storeUserData(foundUser);
      this.props.loadFavorites(favoritesArray);
      this.props.history.push('/');
    } else {
      alert('Incorrect Password');
    }
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="inputField"
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="inputField"
          />
          <button className="loginButton" />
        </form>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  favorites: state.user.favorites
});

export const mapDispatchToProps = dispatch => ({
  toggleLogin: () => dispatch(toggleLogin()),
  storeUserData: userData => dispatch(storeUserData(userData)),
  loadFavorites: favoritesArray => dispatch(loadFavorites(favoritesArray))
});

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  favorites: PropTypes.array.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  storeUserData: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
