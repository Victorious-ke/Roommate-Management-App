import React from 'react';

const ChoreItem = ({ chore, roommates, onToggleStatus }) => {
const assignedRoommate = roommates.find(r => r.id === chore.roommateId);

return (
<li className={`chore-item ${chore.completed ? 'chore-completed' : ''}`}>
<div>
<h3>{chore.title}</h3>
<p>Assigned to: <strong>{assignedRoommate ? assignedRoommate.name : 'Unassigned'}</strong></p>
<p>Status: <strong>{chore.completed ? 'Done' : 'Pending'}</strong></p>
<p>Due Date: {chore.dueDate}</p>
</div>
<button onClick={() => onToggleStatus(chore.id, !chore.completed)}>
{chore.completed ? 'Undo' : 'Complete'}
</button>
</li>
);
};

export default ChoreItem;



/** Purpose: This component is a "dumb" or "presentational" component. It receives a single chore object as a prop from 
 * its parent (ChoreList) and renders the details (title, assigned person, status, etc.). It does not need to make its own API calls.
 */
/** Database Interaction:
Database Interaction:
None. */

/**(Child of ChoreList.jsx)
Renders one for each chore in the ChoreList.
It receives a single chore object as a prop and displays its details. */
