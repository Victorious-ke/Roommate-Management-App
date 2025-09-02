import React, { useState } from 'react';

const Events = ({ events, roommates, onAddEvent, onDeleteEvent }) => {
  const [newEventData, setNewEventData] = useState({
    title: '',
    assignedTo: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEventData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEventData.title || !newEventData.assignedTo || !newEventData.date) {
      console.error('Please fill out all fields for the event.');
      return;
    }
    onAddEvent(newEventData);
    setNewEventData({ title: '', assignedTo: '', date: '' });
  };

  if (!events || !Array.isArray(events)) {
    return <div className="page-container">No events found.</div>;
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Events</h2>
      <form onSubmit={handleSubmit} className="chore-form">
        <input
          type="text"
          name="title"
          value={newEventData.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
        />
        <select
          name="assignedTo"
          value={newEventData.assignedTo}
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
        <input
          type="date"
          name="date"
          value={newEventData.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.length > 0 ? (
          events.map(event => {
            const assignedRoommate = roommates.find(r => r.id === event.assignedTo);
            const assignedName = assignedRoommate ? assignedRoommate.name : 'Unassigned';
            return (
              <li key={event.id} className="chore-item">
                <div>
                  <h3>{event.title}</h3>
                  <p>Assigned to: <strong>{assignedName}</strong></p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                </div>
                <button onClick={() => onDeleteEvent(event.id)}>
                  Remove
                </button>
              </li>
            );
          })
        ) : (
          <p>There are no events scheduled.</p>
        )}
      </ul>
    </div>
  );
};

export default Events;












/** Purpose: This component would display a list of events, such as grocery shopping trips, house dinners, or other scheduled activities. You could show details like the event title, a brief description, the creator's name, and the list of participants. This component could be part of a separate route, 
 * for example, /events, to keep your application organized.* 
 */
/** Database Interaction:
GET /events: This component would fetch the list of all events from the database.
GET /roommates: To display the names of the createdBy roommate and all participants, 
you would need to fetch the roommate data and cross-reference the IDs. */

/** (Child of App.jsx)
Renders when the route is /events.
Displays a list of events. Like RoomMates.jsx, it can be a simple standalone component for this project's scope. */
