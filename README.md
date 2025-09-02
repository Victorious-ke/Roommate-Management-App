# Roommate Management App

## Project Overview
We built the **Roommate Management App** as a collaborative single-page application to simplify shared living.  
Our goal was to create a centralized platform where roommates can easily manage household chores, track upcoming events, and stay connected.  

The project was developed with a strong focus on a robust **React frontend**, using a simulated backend provided by **JSON Server** for a seamless development experience.

---

## Team
This project was a collaborative effort by our team:

- **Laban Mugutu** → Event Calendar feature  
- **Praxcedes Kabeya** → Bill Splitting feature  
- **Victorious Ngaruiya** → Notifications feature  
- **[Your Name]** → Chore & General Dashboard features  

---

## Features
Our app comes with a range of features designed to make co-living easier:

- **Chore Management**: Add, assign, and track the status of chores.  
- **Roommate Directory**: View your roommates' profiles.  
- **Event Calendar**: Add and manage upcoming events.  
- **Theme Toggle**: Switch between light and dark themes.  

---

## Technical Stack
We used a modern and efficient stack:

- **Frontend**: React.js with Vite  
- **Styling**: Custom CSS with CSS variables (for theme toggle)  
- **State Management**: React Hooks (`useState`, `useEffect`)  
- **Routing**: React Router DOM  
- **Backend**: JSON Server (RESTful API simulation)  

---

## Getting Started

### Prerequisites
- Install [Node.js](https://nodejs.org/) and npm on your machine.

### Installation
1. Create the project with Vite:
   ```bash
   npm create vite@latest
   
Select React and JavaScript when prompted.

2. Navigate into your project directory:
   ```bash
   cd [your-project-name]

3. Install dependencies:
    ```bash
    npm install

4. Install required packages:
   ```bash
   npm install react-router-dom json-server

5. Set up the database file:
   Create a file named db.json in the project root with the following content:
   ```bash
   {
   "roommates": [],
   "events": [],
   "chores": [],
   "bills": [],
   "calendar": [],
   "notifications": [],
   }

Running the Application

- **Backend (JSON Server)**:
   ```bash
   npx json-server --watch db.json --port 3000


- **Frontend (React Dev Server)**:
    ```bash
    npm run dev

The app will run at: http://localhost:5173

## API Endpoints
JSON Server provides RESTful endpoints:

- `GET /roommates`  
- `POST /roommates`  
- `GET /chores`  
- `POST /chores`  
- `GET /events`  
- `POST /events`  
- `PATCH /resource/:id`  
- `DELETE /resource/:id`  

---

## Deployment

### Frontend (Netlify)
- Deployed on **Netlify** for React hosting.  
- Added a **_redirects** file in the `public/` folder for React Router.  
- Used **environment variables** (`VITE_API_URL`) for different API URLs.  

### Backend (Render)
- Deployed backend on **Render**.  
- Configured **json-server** to run as the API server.  

---

## Contribution Guidelines 
We followed these practices for teamwork:

- **Version Control**: Shared GitHub repository  
- **Commit Messages**: Descriptive
- **Branching**: Each feature in its own branch → pull requests into `main`  
- **Code Reviews**: Team review before merging  

---

## License 
This project is licensed under the **MIT License**.











