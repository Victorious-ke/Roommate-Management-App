/** Purpose: The NavBar's primary function is for client-side navigation using React Router's NavLink or Link components. 
 * It does not need to interact directly with the database. */
/** Database Interaction: None. */

/** (Child of App.jsx)
It will appear on all pages and is not a parent to any of the other main components. */

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <span>Roommate Management App</span>
      <div>
        <Link to="/">Home</Link>
        <Link to="/chores">Chores</Link>
        <Link to="/chores/new">Add Chore</Link>
        <Link to="/roommates">Roommates</Link>
        <Link to="/events">Events</Link>
      </div>
    </nav>
  );
};

export default NavBar;

