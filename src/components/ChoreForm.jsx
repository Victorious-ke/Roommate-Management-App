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