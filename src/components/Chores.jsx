import React, { useState, useEffect } from 'react';
import ChoreList from './ChoreList';
import ChoreForm from './ChoreForm';
import { Routes, Route } from 'react-router-dom';

const Chores = () => {
  const [chores, setChores] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchChoresAndRoommates = async () => {
      try {
        const [choresResponse, roommatesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/chores`),
          fetch(`${API_BASE_URL}/roommates`),
        ]);

        if (!choresResponse.ok) {
          throw new Error(`Failed to fetch chores: ${choresResponse.status}`);
        }
        if (!roommatesResponse.ok) {
          throw new Error(`Failed to fetch roommates: ${roommatesResponse.status}`);
        }

        const choresData = await choresResponse.json();
        const roommatesData = await roommatesResponse.json();

        setChores(choresData);
        setRoommates(roommatesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please check if the JSON Server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchChoresAndRoommates();
  }, []);

  const handleToggleStatus = async (id, newStatus) => {
    try {
      const choreToUpdate = chores.find(chore => chore.id === id);
      if (!choreToUpdate) return;

      const updatedChore = { ...choreToUpdate, completed: newStatus, status: newStatus ? "Done" : "Pending" };

      const response = await fetch(`${API_BASE_URL}/chores/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChore),
      });

      if (!response.ok) {
        throw new Error('Failed to update chore status on the server.');
      }

      const updatedChoreData = await response.json();
      setChores(prevChores =>
        prevChores.map(chore =>
          chore.id === id ? updatedChoreData : chore
        )
      );
    } catch (err) {
      console.error("Error updating chore:", err);
      setError("Failed to update chore status.");
    }
  };

  const handleAddChore = async (newChore) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newChore, completed: false, status: 'Pending' }),
      });

      if (!response.ok) {
        throw new Error('Failed to add chore on the server.');
      }

      const addedChore = await response.json();
      setChores(prevChores => [...prevChores, addedChore]);
    } catch (err) {
      console.error("Error adding chore:", err);
      setError("Failed to add chore.");
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <Routes>
      <Route path="/" element={
        <ChoreList
          chores={chores}
          roommates={roommates}
          onToggleStatus={handleToggleStatus}
        />
      } />
      <Route path="new" element={
        <ChoreForm
          roommates={roommates}
          onAddChore={handleAddChore}
        />
      } />
    </Routes>
  );
};

export default Chores;




/** This component will be the "container" or "smart" component. It will manage the state for the entire chores page, including:
The list of all chores.
The list of all roommates.
The functions that update the chores, like onToggleStatus. */