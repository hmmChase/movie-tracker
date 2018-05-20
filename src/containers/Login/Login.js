import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData } from '../../utils/fetchUserData';
import { fetchFavoriteData } from '../../utils/fetchFavoriteData';
import { toggleLogin, storeUserData, loadFavorites } from '../../actions';

class Login extends Component {
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

    if (!foundUser) {
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  favorites: state.user.favorites
});

const mapDispatchToProps = dispatch => ({
  toggleLogin: () => dispatch(toggleLogin()),
  storeUserData: userData => dispatch(storeUserData(userData)),
  loadFavorites: favoritesArray => dispatch(loadFavorites(favoritesArray))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
