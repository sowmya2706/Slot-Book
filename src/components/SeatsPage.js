// src/components/SeatsPage.js
import React from "react";
import { useBooking } from "../context/BookingContext";
import DateTimePicker from "./DateTimePicker/DateTimePicker";
import SeatMap from "./SeatMap/SeatMap";
import "./SeatsPage.css";

export default function SeatsPage() {
  const { state, dispatch } = useBooking();
  const { selectedShow, selectedDate, selectedTime } = state;

  const canShowSeats = selectedDate && selectedTime;

  return (
    <div className="seats-page">
      <div className="seats-page-header">
        <button className="back-btn" onClick={() => dispatch({ type: "SET_STEP", payload: "home" })}>
          ← All Shows
        </button>
        <div className="show-badge">
          <span>{selectedShow?.poster}</span>
          <div>
            <div className="show-badge-title">{selectedShow?.title}</div>
            <div className="show-badge-meta">{selectedShow?.genre} · {selectedShow?.duration}</div>
          </div>
        </div>
      </div>

      <div className="seats-layout">
        <div className="sidebar">
          <DateTimePicker />
        </div>
        <div className="main-area">
          {canShowSeats ? (
            <>
              <div className="slot-info-bar">
                <span className="slot-date">
                  {new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                </span>
                <span className="slot-sep">·</span>
                <span className="slot-time">{selectedTime}</span>
              </div>
              <SeatMap />
            </>
          ) : (
            <div className="no-slot-placeholder">
              <span>📅</span>
              <p>Select a date and time to see available seats</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
