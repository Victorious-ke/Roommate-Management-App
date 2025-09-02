import React, { useState } from "react";

const RoomMates = ({ roommates, onAddRoommate, onDeleteRoommate }) => {
const [newRoommateName, setNewRoommateName] = useState("");
const [newRoommateEmail, setNewRoommateEmail] = useState("");
const [newRoommateAvatar, setNewRoommateAvatar] = useState("");

const handleSubmit = (e) => {
e.preventDefault();
if (newRoommateName.trim()) {
onAddRoommate({
name: newRoommateName,
email: newRoommateEmail,
avatar: newRoommateAvatar,
});
setNewRoommateName("");
setNewRoommateEmail("");
setNewRoommateAvatar("");
}
};

if (!roommates || roommates.length === 0) {
return (
<div className="page-container">
<h2 className="page-title">Roommates</h2>
<p>No roommates to display.</p>
<form onSubmit={handleSubmit} className="chore-form">
<input
type="text"
value={newRoommateName}
onChange={(e) => setNewRoommateName(e.target.value)}
placeholder="Enter new roommate's name"
required
/>
<input
type="email"
value={newRoommateEmail}
onChange={(e) => setNewRoommateEmail(e.target.value)}
placeholder="Email (optional)"
/>
<input
type="text"
value={newRoommateAvatar}
onChange={(e) => setNewRoommateAvatar(e.target.value)}
placeholder="Avatar URL (optional)"
/>
<button type="submit">Add Roommate</button>
</form>
</div>
);
}

return (
<div className="page-container">
<h2 className="page-title">Roommates</h2>
<form onSubmit={handleSubmit} className="chore-form">
<input
type="text"
value={newRoommateName}
onChange={(e) => setNewRoommateName(e.target.value)}
placeholder="Enter new roommate's name"
required
/>
<input
type="email"
value={newRoommateEmail}
onChange={(e) => setNewRoommateEmail(e.target.value)}
placeholder="Enter roommate's email"
required
/>
<input
type="text"
value={newRoommateAvatar}
onChange={(e) => setNewRoommateAvatar(e.target.value)}
placeholder="Enter avatar URL"
required
/>
<button type="submit">Add Roommate</button>
</form>
<ul>
{roommates.map((roommate) => (
<li key={roommate.id} className="chore-item">
{/* Add an image element to display the avatar */}
{roommate.avatar && (
<img
src={roommate.avatar}
alt={roommate.name}
className="roommate-avatar"
/>
)}
<p>{roommate.name}</p>
<button onClick={() => onDeleteRoommate(roommate.id)}>
Remove
</button>
</li>
))}
</ul>
</div>
);
};

export default RoomMates;

/** Purpose: This component would display a list of all the roommates, showing their names, avatars,
 * and perhaps their email addresses. This component could also be part of a route, such as /roommates.
 * This is useful for providing a central place to view all the users of the app. It would also be a
 * good place to demonstrate a GET request. */

/** Database Interaction:
GET /roommates: This is the main endpoint for this component. It would fetch the list of all roommates. */

/** (Child of App.jsx)
Renders when the route is /roommates.
Displays a list of all roommates. It may contain a child component for a single roommate, but 
for this project, it can be a simple standalone component. */
