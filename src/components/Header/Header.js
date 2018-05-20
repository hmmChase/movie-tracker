import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { toggleLogin, loadFavorites } from '../../actions';
import { fetchFavorites } from '../../utils/fetchFavoriteData';
import './Header.css';

const Header = props => {
  const handleClick = async () => {
    const favoritesArray = await fetchFavorites(props.userId);

    props.loadFavorites(favoritesArray);
  };

  const showDefaultState = (
    <div className="userControls">
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
      <NavLink to="/signup">
        <button>Sign Up</button>
      </NavLink>
    </div>
  );

  const showLoggedInState = (
    <div className="userControls">
      <NavLink to='/'> 
        <button onClick={props.toggleLogin}>Log Out</button>
      </NavLink>
      <NavLink to="/favorites">
        <button onClick={handleClick}>Favorites</button>
      </NavLink>
      <p>Welcome back, {props.name}</p>
    </div>
  );

  return (
    <header>
      <NavLink to="/">
        <img 
          src="https://fontmeme.com/permalink/180520/17ff7fa8ddbb9659c011cbf5dacff735.png"
          alt="movie-tracker logo" 
          className="headerLogo"
        />
      </NavLink>
      {props.loggedIn 
        ? showLoggedInState
        : showDefaultState
      }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
