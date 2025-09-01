import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  // Load events
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new event submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const eventToAdd = {
      id: String(Date.now()), // quick unique id
      title: newEvent.title,
      description: newEvent.description,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      createdBy: "1",
      participants: ["1"],
      relatedType: "chore",
      relatedId: "101",
    };

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventToAdd),
    })
      .then((res) => res.json())
      .then((savedEvent) => {
        setEvents((prev) => [...prev, savedEvent]);
        setNewEvent({ title: "", description: "", startTime: "", endTime: "" });
      })
      .catch((err) => console.error("Error adding event:", err));
  };

  // Filter events for selected date
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime);
    if (isNaN(eventDate)) return false;
    return (
      format(eventDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    );
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Calendar</h2>

      {/* Calendar viewer */}
      <Calendar value={selectedDate} onChange={setSelectedDate} />

      {/* Event list */}
      <div style={{ marginTop: "1rem" }}>
        <h3>Events on {format(selectedDate, "PPP")}:</h3>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{event.title}</strong> <br />
              {format(new Date(event.startTime), "p")} –{" "}
              {format(new Date(event.endTime), "p")}
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events for this day.</p>
        )}
      </div>

      {/* Add event form */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Add New Event</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event title"
            value={newEvent.title}
            onChange={handleChange}
            required
          />
          <br />
          <textarea
            name="description"
            placeholder="Event description"
            value={newEvent.description}
            onChange={handleChange}
          />
          <br />
          <label>
            Start Time:
            <input
              type="datetime-local"
              name="startTime"
              value={newEvent.startTime}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            End Time:
            <input
              type="datetime-local"
              name="endTime"
              value={newEvent.endTime}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default CalendarPage;
