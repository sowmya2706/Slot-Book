// src/context/BookingContext.js
import React, { createContext, useContext, useReducer } from "react";

const BookingContext = createContext();

const initialState = {
  selectedShow: null,
  selectedDate: "",
  selectedTime: "",
  selectedSeats: [],
  bookings: [],         // confirmed bookings
  adminBookings: [],    // all bookings for admin
  currentStep: "home",  // home | seats | confirm | success | admin
};

function bookingReducer(state, action) {
  switch (action.type) {
    case "SELECT_SHOW":
      return { ...state, selectedShow: action.payload, selectedDate: "", selectedTime: "", selectedSeats: [] };
    case "SELECT_DATE":
      return { ...state, selectedDate: action.payload, selectedSeats: [] };
    case "SELECT_TIME":
      return { ...state, selectedTime: action.payload, selectedSeats: [] };
    case "TOGGLE_SEAT": {
      const exists = state.selectedSeats.find((s) => s.id === action.payload.id);
      const updated = exists
        ? state.selectedSeats.filter((s) => s.id !== action.payload.id)
        : [...state.selectedSeats, action.payload];
      return { ...state, selectedSeats: updated };
    }
    case "CONFIRM_BOOKING": {
      const booking = {
        id: `BK-${Date.now()}`,
        show: state.selectedShow,
        date: state.selectedDate,
        time: state.selectedTime,
        seats: state.selectedSeats,
        total: action.payload.total,
        customer: action.payload.customer,
        bookedAt: new Date().toISOString(),
        status: "confirmed",
      };
      return {
        ...state,
        bookings: [...state.bookings, booking],
        adminBookings: [...state.adminBookings, booking],
        currentStep: "success",
        lastBooking: booking,
      };
    }
    case "CANCEL_BOOKING": {
      const updated = state.adminBookings.map((b) =>
        b.id === action.payload ? { ...b, status: "cancelled" } : b
      );
      return { ...state, adminBookings: updated };
    }
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "RESET":
      return { ...initialState, bookings: state.bookings, adminBookings: state.adminBookings };
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
