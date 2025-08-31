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

import React from 'react';

const Events = ({ events, roommates }) => {
  return (
    <div>
      <h2 className="page-title">Events</h2>
      <ul>
        {events.map(event => {
          // Find the roommate who created the event
          const assignedRoommate = roommates.find(r => r.id === event.assignedTo);
          const assignedName = assignedRoommate ? assignedRoommate.name : 'Unassigned';
          return (
            <li key={event.id} className="chore-item">
              <h3>{event.title}</h3>
              <p>Assigned to: **{assignedName}**</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Events;