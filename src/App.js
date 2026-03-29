// src/App.js
import React from "react";
import { useBooking } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SeatsPage from "./components/SeatsPage";
import BookingConfirmation from "./components/BookingConfirmation/BookingConfirmation";
import BookingSuccess from "./components/BookingSuccess";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import "./App.css";

function StepRouter() {
  const { state } = useBooking();

  switch (state.currentStep) {
    case "home":     return <Home />;
    case "seats":    return <SeatsPage />;
    case "confirm":  return <BookingConfirmation />;
    case "success":  return <BookingSuccess />;
    case "admin":    return <AdminPanel />;
    default:         return <Home />;
  }
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <StepRouter />
      </main>
    </div>
  );
}
