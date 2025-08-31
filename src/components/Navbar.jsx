import React from "react";
import NotificationCenter from "./NotificationCenter";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Roommate App</h2>
      <div className="navbar-right">
        <NotificationCenter />
      </div>
    </nav>
  );
}
