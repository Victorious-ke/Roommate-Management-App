import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Chores from './components/Chores';
import RoomMates from './components/RoomMates';
import Events from './components/Events';
import SideBar from './components/SideBar';
import LoginPage from "./pages/LoginPage";
import './styles/theme.css';

function App() {
  const [chores, setChores] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [events, setEvents] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [choresResponse, roommatesResponse, eventsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/chores`),
          fetch(`${API_BASE_URL}/roommates`),
          fetch(`${API_BASE_URL}/events`)
        ]);

        if (!choresResponse.ok || !roommatesResponse.ok || !eventsResponse.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const choresData = await choresResponse.json();
        const roommatesData = await roommatesResponse.json();
        const eventsData = await eventsResponse.json();

        setChores(choresData);
        setRoommates(roommatesData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchAllData();
  }, [API_BASE_URL]);

  const handleAddChore = async (newChore) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newChore, completed: false, status: 'Pending' }),
      });
      if (response.ok) {
        const addedChore = await response.json();
        setChores(prevChores => [...prevChores, addedChore]);
      } else {
        throw new Error('Failed to add chore on the server.');
      }
    } catch (error) {
      console.error("Error adding chore:", error);
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      const choreToUpdate = chores.find(chore => chore.id === id);
      if (!choreToUpdate) return;
      
      const updatedChore = { ...choreToUpdate, completed: newStatus, status: newStatus ? "Done" : "Pending" };
      const response = await fetch(`${API_BASE_URL}/chores/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedChore),
      });

      if (response.ok) {
        const updatedChoreData = await response.json();
        setChores(prevChores =>
          prevChores.map(chore => chore.id === id ? updatedChoreData : chore)
        );
      } else {
        throw new Error('Failed to update chore status on the server.');
      }
    } catch (error) {
      console.error("Error updating chore:", error);
    }
  };

  const handleAddRoommate = async (newRoommate) => {
    try {
      const response = await fetch(`${API_BASE_URL}/roommates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoommate),
      });
      if (response.ok) {
        const addedRoommate = await response.json();
        setRoommates(prevRoommates => [...prevRoommates, addedRoommate]);
      } else {
        throw new Error('Failed to add roommate.');
      }
    } catch (error) {
      console.error("Error adding roommate:", error);
    }
  };

  const handleDeleteRoommate = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/roommates/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRoommates(prevRoommates => prevRoommates.filter(rm => rm.id !== id));
      } else {
        throw new Error('Failed to delete roommate.');
      }
    } catch (error) {
      console.error("Error deleting roommate:", error);
    }
  };
  
  const handleAddEvent = async (newEvent) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
      if (response.ok) {
        const addedEvent = await response.json();
        setEvents(prevEvents => [...prevEvents, addedEvent]);
      } else {
        throw new Error('Failed to add event.');
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  
  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEvents(prevEvents => prevEvents.filter(ev => ev.id !== id));
      } else {
        throw new Error('Failed to delete event.');
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  if (!loggedInUser) {
    return <LoginPage roommates={roommates} onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-layout">
        <SideBar chores={chores} />
        <main className="main-content">
          <NavBar user={loggedInUser} onLogout={handleLogout} />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home chores={chores} roommates={roommates} events={events} />} />
              <Route path="/chores" element={<Chores chores={chores} roommates={roommates} onToggleStatus={handleToggleStatus} onAddChore={handleAddChore} />} />
              <Route path="/roommates" element={<RoomMates roommates={roommates} onAddRoommate={handleAddRoommate} onDeleteRoommate={handleDeleteRoommate} />} />
              <Route path="/events" element={<Events events={events} roommates={roommates} onAddEvent={handleAddEvent} onDeleteEvent={handleDeleteEvent} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;







/** (Parent)
This is the top-level component. It will contain the router and render the NavBar on every page.
It renders other components (Home, ChoreList, ChoreForm, RoomMates, Events) as children based on the current route.
It will hold the main application state (e.g., the chores and roommates data) and pass it down to its children via props.
The state-updating function (e.g., addChore) will be defined here and passed down to ChoreForm. */