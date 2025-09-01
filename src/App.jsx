/** (Parent)
This is the top-level component. It will contain the router and render the NavBar on every page.
It renders other components (Home, ChoreList, ChoreForm, RoomMates, Events) as children based on the current route.
It will hold the main application state (e.g., the chores and roommates data) and pass it down to its children via props.
The state-updating function (e.g., addChore) will be defined here and passed down to ChoreForm. */


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ChoreList from './components/ChoreList';
import ChoreForm from './components/ChoreForm';
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

  useEffect(() => {
    const fetchChores = async () => {
      const data = [
        { id: 1, title: 'Clean the kitchen', assignedTo: 1, dueDate: '2024-10-26', completed: false, status: 'Pending' },
        { id: 2, title: 'Take out the trash', assignedTo: 2, dueDate: '2024-10-27', completed: true, status: 'Done' },
        { id: 3, title: 'Mow the lawn', assignedTo: 3, dueDate: '2024-10-28', completed: false, status: 'Pending' },
        { id: 4, title: 'Water the plants', assignedTo: 4, dueDate: '2024-10-29', completed: false, status: 'Pending' },
      ];
      setChores(data);
    };

    const fetchRoommates = async () => {
      const data = [
        { id: 1, name: 'Beatrice Wambui', email: 'bea@example.com' },
        { id: 2, name: 'Praxcedes Kabeya', email: 'prax@example.com' },
        { id: 3, name: 'Laban Mugutu', email: 'laban@example.com' },
        { id: 4, name: 'Victorious Ngaruiya', email: 'vic@example.com' },
      ];
      setRoommates(data);
    };

    const fetchEvents = async () => {
      const data = [
        { id: 1, title: 'House party', assignedTo: 1, date: '2024-11-15' },
        { id: 2, title: 'Game night', assignedTo: 2, date: '2024-11-20' },
      ];
      setEvents(data);
    };

    fetchChores();
    fetchRoommates();
    fetchEvents();
  }, []);

  const addChore = (newChore) => {
    setChores([...chores, { ...newChore, id: Date.now() }]);
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
              <Route path="/chores" element={<ChoreList chores={chores} roommates={roommates} />} />
              <Route path="/chores/new" element={<ChoreForm roommates={roommates} addChore={addChore} />} />
              <Route path="/roommates" element={<RoomMates roommates={roommates} />} />
              <Route path="/events" element={<Events events={events} roommates={roommates} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;