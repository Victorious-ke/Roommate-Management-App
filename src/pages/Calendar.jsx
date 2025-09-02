// src/pages/Calendar.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay, isAfter } from "date-fns";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Fetch events from JSON Server
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Filter events for the selected date
  const dailyEvents = events.filter((event) =>
    isSameDay(new Date(event.startTime), date)
  );

  // Upcoming events (from today onwards)
  const upcomingEvents = events
    .filter((event) => isAfter(new Date(event.startTime), new Date()))
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  // Highlight days with events
  const tileClassName = ({ date }) => {
    if (events.some((event) => isSameDay(new Date(event.startTime), date))) {
      return "has-event"; // styled below
    }
    return null;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">📅 Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-1 bg-white shadow-md rounded-2xl p-4">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
          />
        </div>

        {/* Events Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Daily Events */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Events on {format(date, "PPP")}
            </h2>
            {dailyEvents.length > 0 ? (
              <ul className="space-y-3">
                {dailyEvents.map((event) => (
                  <li
                    key={event.id}
                    className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="font-medium text-gray-800">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(event.startTime), "p")} –{" "}
                      {format(new Date(event.endTime), "p")}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No events for this day.</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Upcoming Events
            </h2>
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-3">
                {upcomingEvents.map((event) => (
                  <li
                    key={event.id}
                    className="p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="font-medium text-gray-800">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(event.startTime), "PPP p")}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No upcoming events.</p>
            )}
          </div>
        </div>
      </div>

      {/* Custom styling for calendar event highlight */}
      <style>
        {`
          .has-event {
            background: #3b82f6;
            color: white !important;
            border-radius: 50%;
          }
          .react-calendar {
            width: 100%;
            border: none;
            font-family: inherit;
          }
          .react-calendar__tile {
            padding: 0.75rem 0.5rem;
            border-radius: 0.5rem;
          }
          .react-calendar__tile:enabled:hover {
            background: #e0e7ff;
          }
          .react-calendar__tile--active {
            background: #6366f1 !important;
            color: white !important;
          }
        `}
      </style>
    </div>
  );
}

export default CalendarPage;
