import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLogin, loadFavorites } from '../../actions';
import { fetchFavorites } from '../../utils/fetchFavoriteData';

const Header = props => {
  const handleClick = async () => {
    const favoritesArray = await fetchFavorites(props.userId);

    props.loadFavorites(favoritesArray);
  };

  const showDefaultState = (
    <div>
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
      <NavLink to="/signup">
        <button>Sign Up</button>
      </NavLink>
    </div>
  );

  const showLoggedInState = (
    <div>
      <p>Welcome back, {props.name}</p>
      <NavLink to='/'> 
        <button onClick={props.toggleLogin}>Log Out</button>
      </NavLink>
      <NavLink to="/favorites">
        <button onClick={handleClick}>Favorites</button>
      </NavLink>
    </div>
  );

  return (
    <header>
      <NavLink to="/">
        <h1>MOVIE TRACKER</h1>
      </NavLink>
      {props.loggedIn ? (
        <div>
          {showLoggedInState}
        </div>
      ) : (
        showDefaultState
      )}
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
  loadFavorites: (userId) => dispatch(loadFavorites(userId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
