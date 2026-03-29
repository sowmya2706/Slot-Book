// src/components/Home.js
import React from "react";
import { useBooking } from "../context/BookingContext";
import { SHOWS } from "../data/mockData";
import "./Home.css";

export default function Home() {
  const { dispatch } = useBooking();

  const handleSelectShow = (show) => {
    dispatch({ type: "SELECT_SHOW", payload: show });
    dispatch({ type: "SET_STEP", payload: "seats" });
  };

  return (
    <div className="home">
      <div className="home-hero">
        <span className="home-tag">NOW SHOWING</span>
        <h1 className="home-title">What will you<br /><em>experience</em> today?</h1>
        <p className="home-sub">Select a show to check availability and book your seats</p>
      </div>

      <div className="shows-grid">
        {SHOWS.map((show) => (
          <button key={show.id} className="show-card" onClick={() => handleSelectShow(show)}>
            <div className="show-poster">{show.poster}</div>
            <div className="show-info">
              <div className="show-rating">★ {show.rating}</div>
              <h3 className="show-title">{show.title}</h3>
              <p className="show-meta">{show.genre} · {show.duration}</p>
            </div>
            <div className="show-cta">Book Now →</div>
          </button>
        ))}
      </div>
    </div>
  );
}
