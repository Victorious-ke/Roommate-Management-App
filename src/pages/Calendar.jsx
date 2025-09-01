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
      // Convert backend data into FullCalendar format
      const formatted = data.map((ev) => ({
        id: ev.id,
        title: ev.title,
        description: ev.description,
        start: ev.startTime,
        end: ev.endTime,
        relatedChoreId: ev.relatedChoreId || null,
        relatedBillId: ev.relatedBillId || null,
      }));

      setEvents(formatted);
    } catch (err) {
      console.error(" Failed to fetch events:", err);
    }
  };
  // Load events on first render
  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔹 Handle clicking an existing event
  const handleEventClick = (info) => {
    const clicked = events.find((ev) => ev.id.toString() === info.event.id);
    setSelectedEvent(clicked);
    setIsModalOpen(true);
  };

  // 🔹 Handle clicking an empty date
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // ISO string like "2025-09-01"
    setSelectedEvent(null);        // Clear selected event
    setIsModalOpen(true);
  };
  // 🔹 Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Roommate Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"      // Default view = month
        events={events}                  // Events loaded from backend
        eventClick={handleEventClick}    // When an event is clicked
        dateClick={handleDateClick}      // When a day is clicked
        height="80vh"                    // Take most of the screen
      />

      {/* Popup Modal for add/edit/delete */}
      {isModalOpen && (
        <CalendarModal
          event={selectedEvent}
          date={selectedDate}
          onClose={closeModal}
          refreshEvents={fetchEvents} // Reload events after changes
        />
      )}
    </div>
  );
}

