/** Purpose: This controlled form will gather user input, create a new chore object, and send it to your json-server. It will also need to handle the state update in your parent component (App.jsx) to re-render 
 * the list of chores with the newly added one. */
/** Database Interaction:
POST /chores: This is the main purpose of this component. When a user fills out and submits the form, you will make a 
POST request to this endpoint to add a new chore to your database.
GET /roommates: To populate a dropdown menu or a list of options for assigning the new chore to a roommate. 
This is a common and user-friendly feature for a form. */

/*ChoreForm.jsx (Child of App.jsx)
Renders when the route is /chores/new.
It has no children from this component list. It's a standalone form that handles the POST request.*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ChoreForm = ({ roommates, onAddChore }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !assignedTo || !dueDate) {
      alert('Please fill out all fields.');
      return;
    }

    const newChore = {
      title,
      assignedTo: parseInt(assignedTo),
      dueDate,
      status: 'pending',
      completed: false,
    };

    try {
      const response = await fetch(`${API_URL}/chores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChore),
      });

      if (!response.ok) {
        throw new Error('Failed to add chore');
      }

      const addedChore = await response.json();
      onAddChore(addedChore);

      setTitle('');
      setAssignedTo('');
      setDueDate('');

      navigate('/chores');
    } catch (error) {
      console.error('Error adding chore:', error);
      alert('Failed to add chore. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Add New Chore</h2>
      <form onSubmit={handleSubmit} className="chore-form">
        <input
          type="text"
          placeholder="Chore Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
          <option value="">Assign to...</option>
          {roommates.map(roommate => (
            <option key={roommate.id} value={roommate.id}>
              {roommate.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Add Chore</button>
      </form>
    </div>
  );
};

export default ChoreForm;