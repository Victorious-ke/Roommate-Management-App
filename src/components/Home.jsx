/* Purpose: The Home component will make GET requests to the endpoints to fetch and display summary information, 
such as the total number of pending chores or a list of roommates. */
/** Database Interaction:
GET /chores: To display an overview of chores on the homepage.
GET /roommates: To show the list of roommates. */

/** (Child of App.jsx)
Renders when the route is /.
It might have some simple children of its own, but for this project, it can be a standalone component. */

import React, { useState, useEffect } from 'react';

const Home = ({ chores, roommates }) => {
  const pendingChores = chores.filter(chore => chore.status === "Pending").length;
  const totalRoommates = roommates.length;
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div>
      {/* Theme Toggle Button */}
      <div className="theme-toggle-container">
        <label className="theme-toggle-switch">
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
          <span className="slider"></span>
        </label>
        <span>{theme === 'dark' ? 'Dark Theme' : 'Light Theme'}</span>
      </div>
      <h2 className="page-title">Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Pending Chores</h3>
          <p>{pendingChores}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Roommates</h3>
          <p>{totalRoommates}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
