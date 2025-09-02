import React, { useState } from 'react';

const ChoreForm = ({ roommates, onAddChore }) => {
  const [choreData, setChoreData] = useState({
    title: '',
    roommateId: '',
    dueDate: '',
    completed: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChoreData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!choreData.title || !choreData.roommateId) {
      console.error('Title and roommate must be selected.');
      return;
    }
    onAddChore(choreData);
    setChoreData({
      title: '',
      roommateId: '',
      dueDate: '',
      completed: false
    });
  };

  return (
    <div className="chore-form-container">
      <h2 className="page-title">Add a New Chore</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Chore Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={choreData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roommateId">Assign to</label>
          <select
            id="roommateId"
            name="roommateId"
            value={choreData.roommateId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Roommate</option>
            {roommates.map(roommate => (
              <option key={roommate.id} value={roommate.id}>
                {roommate.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={choreData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Chore</button>
      </form>
    </div>
  );
};

export default ChoreForm;









/** Purpose: This controlled form will gather user input, create a new chore object, and send it to your json-server. 
 * It will also need to handle the state update in your parent component (App.jsx) to re-render 
 * the list of chores with the newly added one. */
/** Database Interaction:
POST /chores: This is the main purpose of this component. When a user fills out and submits the form, you will make a 
POST request to this endpoint to add a new chore to your database.
GET /roommates: To populate a dropdown menu or a list of options for assigning the new chore to a roommate. 
This is a common and user-friendly feature for a form. */

/*ChoreForm.jsx (Child of App.jsx)
Renders when the route is /chores/new.
It has no children from this component list. It's a standalone form that handles the POST request.*/