import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user, onLogout, toggleTheme }) => {
return (
<nav className="navbar">
<span>Roommate Management App</span>
{user && (
<div className="user-info">
<span>Welcome, {user.name}</span>
<button onClick={toggleTheme} className="theme-toggle-button">
Toggle Theme
</button>
<button onClick={onLogout} className="logout-button">
Logout
</button>
</div>
)}
</nav>
);
};

export default NavBar;

/** Purpose: The NavBar's primary function is for client-side navigation using React Router's NavLink or Link components.
 * It does not need to interact directly with the database. */
/** Database Interaction: None. */

/** (Child of App.jsx)
It will appear on all pages and is not a parent to any of the other main components. */
