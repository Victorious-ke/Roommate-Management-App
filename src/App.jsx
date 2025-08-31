/** (Parent)
This is the top-level component. It will contain the router and render the NavBar on every page.
It renders other components (Home, ChoreList, ChoreForm, RoomMates, Events) as children based on the current route.
It will hold the main application state (e.g., the chores and roommates data) and pass it down to its children via props.
The state-updating function (e.g., addChore) will be defined here and passed down to ChoreForm. */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ChoreList from './components/ChoreList';
import ChoreForm from './components/ChoreForm';
import RoomMates from './components/RoomMates';
import Events from './components/Events';
import './styles/theme.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [chores, setChores] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch chores
    fetch(`${API_URL}/chores`)
      .then(res => res.json())
      .then(data => setChores(data))
      .catch(error => console.error("Error fetching chores:", error));

    // Fetch roommates
    fetch(`${API_URL}/roommates`)
      .then(res => res.json())
      .then(data => setRoommates(data))
      .catch(error => console.error("Error fetching roommates:", error));

    // Fetch events
    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const handleAddChore = (newChore) => {
    setChores([...chores, newChore]);
  };

  return (
    <BrowserRouter>
      <NavBar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home chores={chores} roommates={roommates} />} />
          <Route 
            path="/chores" 
            element={<ChoreList chores={chores} roommates={roommates} />} 
          />
          <Route 
            path="/chores/new" 
            element={<ChoreForm roommates={roommates} onAddChore={handleAddChore} />} 
          />
          <Route 
            path="/roommates" 
            element={<RoomMates roommates={roommates} />} 
          />
          <Route 
            path="/events" 
            element={<Events events={events} roommates={roommates} />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;