// src/components/Navbar.js
import React from "react";
import { useBooking } from "../context/BookingContext";
import "./Navbar.css";

export default function Navbar() {
  const { state, dispatch } = useBooking();

  return (
    <nav className="navbar">
      <button className="nav-logo" onClick={() => dispatch({ type: "RESET" })}>
        <span className="logo-icon">◈</span>
        <span className="logo-text">SlotBook</span>
      </button>

      <div className="nav-right">
        {state.currentStep !== "home" && state.currentStep !== "admin" && (
          <div className="breadcrumb">
            <span
              className={`crumb ${state.currentStep === "seats" ? "active" : "done"}`}
              onClick={() => state.currentStep !== "success" && dispatch({ type: "SET_STEP", payload: "home" })}
            >
              Show
            </span>
            <span className="crumb-sep">›</span>
            <span className={`crumb ${state.currentStep === "seats" ? "active" : state.currentStep === "confirm" || state.currentStep === "success" ? "done" : ""}`}>
              Seats
            </span>
            <span className="crumb-sep">›</span>
            <span className={`crumb ${state.currentStep === "confirm" ? "active" : state.currentStep === "success" ? "done" : ""}`}>
              Confirm
            </span>
            <span className="crumb-sep">›</span>
            <span className={`crumb ${state.currentStep === "success" ? "active" : ""}`}>
              Done
            </span>
          </div>
        )}
        <button
          className="admin-link"
          onClick={() => dispatch({ type: "SET_STEP", payload: "admin" })}
        >
          Admin
        </button>
      </div>
    </nav>
  );
}
