import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { toggleLogin, loadFavorites } from '../../actions';
import { fetchFavoriteData } from '../../utils/fetchFavoriteData';
import './Header.css';

export const Header = props => {
  const handleClick = async () => {
    const favoritesArray = await fetchFavoriteData(props.userId);

    props.loadFavorites(favoritesArray);
  };

  const showDefaultState = (
    <div className="userControls">
      <NavLink className="navLink" to="/login">
        <button className="loginButton"></button>
      </NavLink>
      <NavLink className="navLink" to="/signup">
        <button className="signUpButton"></button>
      </NavLink>
    </div>
  );

  const showLoggedInState = (
    <div className="userControls">
      <NavLink to='/favorites'> 
        <button className="favoritesButton" onClick={handleClick}></button>
      </NavLink>
      <NavLink to="/">
        <button className="logOutButton" onClick={props.toggleLogin}></button>
      </NavLink>
      <p>Welcome back, {props.name}</p>
    </div>
  );

  return (
    <header>
      <NavLink to="/">
        <img
          src="https://goo.gl/qAbw5n"
          alt="movie-tracker logo"
          className="headerLogo"
        />
      </NavLink>
      {props.loggedIn ? showLoggedInState : showDefaultState}
    </header>
  );
};

export const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  name: state.user.name,
  userId: state.user.id
});

export const mapDispatchToProps = dispatch => ({
  toggleLogin: () => dispatch(toggleLogin()),
  loadFavorites: favoritesArray => dispatch(loadFavorites(favoritesArray))
});

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string,
  userId: PropTypes.number,
  toggleLogin: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
