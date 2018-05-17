import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { fetchUserData } from '../../utils/fetchUserData';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }
  // const displayLoggedIn = (
  //   <div>
  //     <p>Welcome userName</p>
  //     <NavLink to="/favorites">Favorites</NavLink>;
  //     <NavLink to="/">Sign Out</NavLink>
  //   </div>
  // );

  // const displayLoggedOut = (
  //   <div>
  //     <form action="">
  //       <input type="text" placeholder="Enter User Name" />
  //       <input type="text" placeholder="Enter Password" />
  //       <button>Login</button>
  //     </form>
  //     <NavLink to="/signup">Sign Up</NavLink>;
  //   </div>
  // );

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
    findUser.password === this.state.password 
      ? <Redirect to="/" />
      : alert('Incorrect Password');
    this.setState({
      email: '',
      password: ''
    });
  };

  render() {
    return (
      <header>
        <NavLink to="/">
          <h1>MOVIE TRACKER</h1>
        </NavLink>
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
      </header>
    );
  }
}
// { userLoggedIn ? displayLoggedIn : displayLoggedOut }

export default Header;
