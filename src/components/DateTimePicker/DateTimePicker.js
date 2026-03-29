// src/components/DateTimePicker/DateTimePicker.js
import React, { useMemo } from "react";
import { useBooking } from "../../context/BookingContext";
import { TIME_SLOTS } from "../../data/mockData";
import "./DateTimePicker.css";

function getDates(count = 14) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

export default function DateTimePicker() {
  const { state, dispatch } = useBooking();
  const dates = useMemo(() => getDates(14), []);

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div className="dtp">
      <div className="dtp-section">
        <h3 className="dtp-label">Select Date</h3>
        <div className="date-strip">
          {dates.map((d) => {
            const iso = formatDate(d);
            const isSelected = state.selectedDate === iso;
            const isToday = formatDate(new Date()) === iso;
            return (
              <button
                key={iso}
                className={`date-chip ${isSelected ? "active" : ""} ${isToday ? "today" : ""}`}
                onClick={() => dispatch({ type: "SELECT_DATE", payload: iso })}
              >
                <span className="date-day">{dayLabels[d.getDay()]}</span>
                <span className="date-num">{d.getDate()}</span>
                <span className="date-month">{monthNames[d.getMonth()]}</span>
                {isToday && <span className="today-dot" />}
              </button>
            );
          })}
        </div>
      </div>

      {state.selectedDate && (
        <div className="dtp-section">
          <h3 className="dtp-label">Select Time</h3>
          <div className="time-grid">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                className={`time-chip ${state.selectedTime === slot ? "active" : ""}`}
                onClick={() => dispatch({ type: "SELECT_TIME", payload: slot })}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
