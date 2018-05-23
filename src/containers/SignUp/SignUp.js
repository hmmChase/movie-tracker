import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData } from '../../utils/fetchUserData';
import { fetchAddUser } from '../../utils/fetchAddUser';
import { toggleLogin, storeUserData } from '../../actions';
import './SignUp.css';

export class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
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
    const foundUser = await this.findUser();
    foundUser ? alert('This email is already in use') : this.addUser();
  };

  addUser = async () => {
    await fetchAddUser(this.state);
    await fetchUserData();
    const foundUser = await this.findUser();
    this.props.storeUserData(foundUser);
    this.props.toggleLogin();
    this.props.history.push('/');
  };

  findUser = async () => {
    const userData = await fetchUserData();
    return userData.data.find(
      user => user.email === this.state.email.toLowerCase()
    );
  };

  render() {
    return (
      <div className="SignUp">
        <p>Sign up for a new account</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter a Name"
            value={this.state.name}
            onChange={this.handleChange}
            className="inputField"
          />
          <input
            type="text"
            name="email"
            placeholder="Enter an Email"
            value={this.state.email}
            onChange={this.handleChange}
            className="inputField"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter a Password"
            value={this.state.password}
            onChange={this.handleChange}
            className="inputField"
          />
          <button className="signUpButton" />
        </form>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  toggleLogin: () => dispatch(toggleLogin()),
  storeUserData: userData => dispatch(storeUserData(userData))
});

SignUp.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  storeUserData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
