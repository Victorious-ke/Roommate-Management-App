/** (Parent)

This is the top-level component. It will contain the router and render the NavBar on every page.

It renders other components (Home, ChoreList, ChoreForm, RoomMates, Events) as children based on the current route.

It will hold the main application state (e.g., the chores and roommates data) and pass it down to its children via props.

The state-updating function (e.g., addChore) will be defined here and passed down to ChoreForm. */