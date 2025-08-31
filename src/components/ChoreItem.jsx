/** Purpose: This component is a "dumb" or "presentational" component. It receives a single chore object as a prop from 
 * its parent (ChoreList) and renders the details (title, assigned person, status, etc.). It does not need to make its own API calls.
 */
/** Database Interaction:
Database Interaction:
None. */

/**(Child of ChoreList.jsx)
Renders one for each chore in the ChoreList.
It receives a single chore object as a prop and displays its details. */

import React from 'react';

const ChoreItem = ({ chore, roommates }) => {
  const assignedRoommate = roommates.find(r => r.id === chore.assignedTo);
  const assignedName = assignedRoommate ? assignedRoommate.name : 'Unassigned';
  const itemClasses = `chore-item ${chore.completed ? 'chore-completed' : ''}`;

  return (
    <li className={itemClasses}>
      <div>
        <h3>{chore.title}</h3>
        <p>Assigned to: **{assignedName}**</p>
        <p>Status: **{chore.status}**</p>
        <p>Due Date: {new Date(chore.dueDate).toLocaleDateString()}</p>
      </div>
    </li>
  );
};

export default ChoreItem;
