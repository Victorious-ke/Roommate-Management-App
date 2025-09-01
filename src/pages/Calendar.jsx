import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";   // Main calendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view
import interactionPlugin from "@fullcalendar/interaction"; // Date/event click
import CalendarModal from "../components/CalendarModal";   // Our popup modal
