import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData } from '../../utils/fetchUserData';
import { fetchAddUser } from '../../utils/fetchAddUser';
import { toggleLogin, storeUserData } from '../../actions';

class Signup extends Component {
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
      <div>
        Sign up for a new account
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter a Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Enter an Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter a Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Sign Up!</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  toggleLogin: () => dispatch(toggleLogin()),
  storeUserData: userData => dispatch(storeUserData(userData))
});

export default withRouter(connect(null, mapDispatchToProps)(Signup));
