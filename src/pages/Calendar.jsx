import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";   // Main calendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view
import interactionPlugin from "@fullcalendar/interaction"; // Date/event click
import CalendarModal from "../components/CalendarModal";   // Our popup modal
export default function Calendar() {
  // Store events fetched from the backend
  const [events, setEvents] = useState([]);
// Track modal state
  const [selectedEvent, setSelectedEvent] = useState(null); // clicked event
  const [selectedDate, setSelectedDate] = useState(null);   // clicked date
  const [isModalOpen, setIsModalOpen] = useState(false);    // modal toggle
// 🔹 Fetch all events from db.json (via json-server)
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:3000/events");
      const data = await res.json();
