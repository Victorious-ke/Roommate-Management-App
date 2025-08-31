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

// Use the environment variable for the API URL
const API_URL = process.env.REACT_APP_API_URL;

const ChoreForm = ({ roommates, onAddChore }) => {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newChore = {
      title: title,
      assignedTo: assignedTo,
      completed: false,
      status: "Pending",
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    fetch(`${API_URL}/chores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newChore),
    })
    .then(res => res.json())
    .then(data => {
      onAddChore(data);
      setTitle('');
      setAssignedTo('');
    })
    .catch(error => console.error("Error adding new chore:", error));
  };

  return (
    <div>
      <h2>Add a New Chore</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Chore Title:</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <br />
        <label htmlFor="assignedTo">Assign To:</label>
        <select 
          id="assignedTo" 
          value={assignedTo} 
          onChange={(e) => setAssignedTo(e.target.value)} 
          required
        >
          <option value="">Select a roommate</option>
          {roommates.map(roommate => (
            <option key={roommate.id} value={roommate.id}>
              {roommate.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Add Chore</button>
      </form>
    </div>
  );
};

export default ChoreForm;