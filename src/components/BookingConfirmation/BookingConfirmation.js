// src/components/BookingConfirmation/BookingConfirmation.js
import React, { useState } from "react";
import { useBooking } from "../../context/BookingContext";
import { SEAT_CATEGORIES } from "../../data/mockData";
import "./BookingConfirmation.css";

export default function BookingConfirmation() {
  const { state, dispatch } = useBooking();
  const { selectedShow, selectedDate, selectedTime, selectedSeats } = state;

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  const total = selectedSeats.reduce(
    (acc, s) => acc + SEAT_CATEGORIES[s.category].price, 0
  );
  const convenience = Math.round(total * 0.05);
  const grandTotal = total + convenience;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "10-digit phone number required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    dispatch({
      type: "CONFIRM_BOOKING",
      payload: { total: grandTotal, customer: form },
    });
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="confirm-wrapper">
      <div className="confirm-grid">
        {/* Left: Summary */}
        <div className="confirm-summary">
          <div className="summary-show">
            <span className="show-poster-sm">{selectedShow?.poster}</span>
            <div>
              <h3 className="summary-show-title">{selectedShow?.title}</h3>
              <p className="summary-show-genre">{selectedShow?.genre}</p>
            </div>
          </div>

          <div className="summary-details">
            <div className="detail-row">
              <span className="detail-label">Date</span>
              <span className="detail-value">{formatDate(selectedDate)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Time</span>
              <span className="detail-value">{selectedTime}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Seats</span>
              <span className="detail-value seats-list">
                {selectedSeats.map((s) => (
                  <span key={s.id} className={`seat-tag cat-${s.category.toLowerCase()}`}>
                    {s.id}
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div className="price-breakdown">
            {Object.entries(
              selectedSeats.reduce((acc, s) => {
                acc[s.category] = (acc[s.category] || 0) + 1;
                return acc;
              }, {})
            ).map(([cat, count]) => (
              <div className="price-row" key={cat}>
                <span>{SEAT_CATEGORIES[cat].label} × {count}</span>
                <span>₹{(SEAT_CATEGORIES[cat].price * count).toLocaleString()}</span>
              </div>
            ))}
            <div className="price-row muted">
              <span>Convenience fee (5%)</span>
              <span>₹{convenience}</span>
            </div>
            <div className="price-row total-row">
              <span>Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="confirm-form">
          <h3 className="form-heading">Your Details</h3>

          {[
            { key: "name", label: "Full Name", type: "text", placeholder: "Sowmya R" },
            { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
            { key: "phone", label: "Phone Number", type: "tel", placeholder: "9876543210" },
          ].map(({ key, label, type, placeholder }) => (
            <div className="form-group" key={key}>
              <label className="form-label">{label}</label>
              <input
                className={`form-input ${errors[key] ? "error" : ""}`}
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
              {errors[key] && <span className="form-error">{errors[key]}</span>}
            </div>
          ))}

          <button className="confirm-btn" onClick={handleSubmit}>
            Confirm & Pay ₹{grandTotal.toLocaleString()} →
          </button>

          <button
            className="back-link"
            onClick={() => dispatch({ type: "SET_STEP", payload: "seats" })}
          >
            ← Change Seats
          </button>
        </div>
      </div>
    </div>
  );
}
