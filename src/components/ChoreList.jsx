/** Purpose: This component will fetch and display all the chore data. It will iterate 
 * through the list of chores and render a separate ChoreItem component for each one, passing the chore data down as props. */
/** Database Interaction:
GET /chores: This is the most crucial endpoint for this component. It will fetch the entire list of chores from your db.json file.
GET /roommates: To display the name of the roommate assigned to each chore. 
You will fetch all roommates and then use the assignedTo ID from a chore to find the corresponding roommate's name. */

/** (Child of App.jsx)
Renders when the route is /chores.
It is the parent to ChoreItem.
It makes the GET request for all chores and maps over the data to render a list of ChoreItem components.
 */

import React from 'react';
import ChoreItem from './ChoreItem';

const ChoreList = ({ chores, roommates }) => {
  // Map over the chores array and render a ChoreItem for each one
  const renderedChores = chores.map(chore => (
    <ChoreItem key={chore.id} chore={chore} roommates={roommates} />
  ));

   return (
    <div>
      <h2 className="page-title">Chore List</h2>
      <ul className="chore-list">
        {renderedChores}
      </ul>
    </div>
  );
};

export default ChoreList;



/** This component receives the chores and roommates data from App.jsx and maps over the chores array. 
 * For each chore, it renders a ChoreItem component. */