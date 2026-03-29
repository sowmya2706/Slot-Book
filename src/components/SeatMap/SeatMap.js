// src/components/SeatMap/SeatMap.js
import React, { useMemo } from "react";
import { useBooking } from "../../context/BookingContext";
import { generateSeats, SEAT_CATEGORIES } from "../../data/mockData";
import "./SeatMap.css";

export default function SeatMap() {
  const { state, dispatch } = useBooking();
  const { selectedShow, selectedDate, selectedTime, selectedSeats } = state;

  const seats = useMemo(() => {
    if (!selectedShow || !selectedDate || !selectedTime) return [];
    return generateSeats(selectedShow.id, selectedDate, selectedTime);
  }, [selectedShow, selectedDate, selectedTime]);

  const rows = [...new Set(seats.map((s) => s.row))];

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;
    dispatch({ type: "TOGGLE_SEAT", payload: seat });
  };

  const isSeatSelected = (seatId) => selectedSeats.some((s) => s.id === seatId);

  const total = selectedSeats.reduce(
    (acc, s) => acc + SEAT_CATEGORIES[s.category].price, 0
  );

  return (
    <div className="seatmap-wrapper">
      <div className="screen-label">
        <div className="screen-bar" />
        <span>SCREEN</span>
      </div>

      <div className="seatmap">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            <div className="seats">
              {seats
                .filter((s) => s.row === row)
                .map((seat) => (
                  <button
                    key={seat.id}
                    className={`seat
                      ${seat.isBooked ? "booked" : ""}
                      ${isSeatSelected(seat.id) ? "selected" : ""}
                      cat-${seat.category.toLowerCase()}
                    `}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                    title={`${seat.id} — ${SEAT_CATEGORIES[seat.category].label} ₹${SEAT_CATEGORIES[seat.category].price}`}
                  >
                    <span className="seat-inner" />
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="seat-legend">
        {Object.entries(SEAT_CATEGORIES).map(([key, val]) => (
          <div key={key} className="legend-item">
            <span className="legend-dot" style={{ background: val.color }} />
            <span>{val.label}</span>
            <span className="legend-price">₹{val.price}</span>
          </div>
        ))}
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "var(--booked)" }} />
          <span>Booked</span>
        </div>
      </div>

      {/* Summary bar */}
      {selectedSeats.length > 0 && (
        <div className="booking-bar">
          <div className="booking-bar-info">
            <span className="booking-seats-count">{selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}</span>
            <span className="booking-seat-ids">{selectedSeats.map((s) => s.id).join(", ")}</span>
          </div>
          <div className="booking-bar-right">
            <span className="booking-total">₹{total.toLocaleString()}</span>
            <button
              className="proceed-btn"
              onClick={() => dispatch({ type: "SET_STEP", payload: "confirm" })}
            >
              Proceed →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
