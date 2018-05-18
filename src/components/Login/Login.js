import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData } from '../../utils/fetchUserData';
import { toggleLogin } from '../../actions';

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
    const findUser = userData.data.find(
      user => user.email === this.state.email
    );

    if (findUser.password === this.state.password) {
      this.props.toggleLogin();
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
  loggedIn: state.users.loggedIn
});

const mapDispatchToProps = dispatch => ({
  toggleLogin: () => dispatch(toggleLogin())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
