// src/components/BookingSuccess.js
import React from "react";
import { useBooking } from "../context/BookingContext";
import "./BookingSuccess.css";

export default function BookingSuccess() {
  const { state, dispatch } = useBooking();
  const booking = state.lastBooking;

  if (!booking) return null;

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2 className="success-title">Booking Confirmed!</h2>
        <p className="success-subtitle">Your tickets are all set. See you at the show!</p>

        <div className="booking-ref">
          <span className="ref-label">Booking ID</span>
          <span className="ref-value">{booking.id}</span>
        </div>

        <div className="ticket-strip">
          <div className="ticket-row">
            <span>{booking.show.poster} {booking.show.title}</span>
          </div>
          <div className="ticket-details">
            <div className="ticket-detail">
              <span className="td-label">Date</span>
              <span>{new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
            <div className="ticket-detail">
              <span className="td-label">Time</span>
              <span>{booking.time}</span>
            </div>
            <div className="ticket-detail">
              <span className="td-label">Seats</span>
              <span>{booking.seats.map((s) => s.id).join(", ")}</span>
            </div>
            <div className="ticket-detail">
              <span className="td-label">Paid</span>
              <span>₹{booking.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <p className="success-email-note">A confirmation has been sent to <strong>{booking.customer.email}</strong></p>

        <div className="success-actions">
          <button
            className="home-btn"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Book Another Show
          </button>
          <button
            className="admin-btn"
            onClick={() => dispatch({ type: "SET_STEP", payload: "admin" })}
          >
            View All Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
