import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const displayLoggedIn = 
    <div>
      <p>Welcome userName</p>
      <NavLink to='/favorites'>Favorites</NavLink>;
      <NavLink to='/'>Sign Out</NavLink>
    </div>;

  const displayLoggedOut = 
    <div>
      <form action="">
        <input type="text" placeholder="Enter User Name" />
        <input type="text" placeholder="Enter Password" />
        <button>Login</button>
      </form>
      <NavLink to='/signup'>Sign Up</NavLink>;
    </div>;

  return (
    <header>
      <NavLink to='/'>
        <h1>MOVIE TRACKER</h1>
      </NavLink>
    </header>
  );
};
  // { userLoggedIn ? displayLoggedIn : displayLoggedOut }