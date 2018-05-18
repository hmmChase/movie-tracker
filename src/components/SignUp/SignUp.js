import React, { Component } from 'react';
import { mapDispatchToProps } from '../MovieContainer/MovieContainer';
import { fetchUserData } from '../../utils/fetchUserData';

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
    const userData = await fetchUserData();
    const findUser = userData.data.find(
      user => user.email === this.state.email
    );

    findUser ? alert('This email is already in use') : this.addUser();
  };

  addUser = () => {
    const url = 'http://localhost:3000/api/users/new';
    const options = {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, options);
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

export default Signup;
