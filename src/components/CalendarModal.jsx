import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";

// 🔹 Popup modal that shows either:
// - Event details (with edit/delete)
// - EventForm (for adding a new one)
export default function CalendarModal({ event, date, onClose, refreshEvents }) {
  const [relatedChore, setRelatedChore] = useState(null);
  const [relatedBill, setRelatedBill] = useState(null);
  const [isEditing, setIsEditing] = useState(!event); // New event = start in edit mode
  // 🔹 Fetch related Chore/Bill if event exists
  useEffect(() => {
    if (event?.relatedChoreId) {
      fetch(`http://localhost:3000/chores/${event.relatedChoreId}`)
        .then((res) => res.json())
        .then((data) => setRelatedChore(data));
    }
    if (event?.relatedBillId) {
      fetch(`http://localhost:3000/bills/${event.relatedBillId}`)
        .then((res) => res.json())
        .then((data) => setRelatedBill(data));
    }
  }, [event]);
