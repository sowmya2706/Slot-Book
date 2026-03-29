// src/data/mockData.js

export const SHOWS = [
  { id: "show-1", title: "Echoes of Tomorrow", genre: "Sci-Fi Drama", duration: "2h 15m", poster: "🚀", rating: "8.4" },
  { id: "show-2", title: "The Last Garden", genre: "Thriller", duration: "1h 50m", poster: "🌿", rating: "7.9" },
  { id: "show-3", title: "Neon Requiem", genre: "Neo-Noir", duration: "2h 5m", poster: "🌃", rating: "9.1" },
  { id: "show-4", title: "Solstice", genre: "Musical", duration: "2h 30m", poster: "🎭", rating: "8.7" },
];

export const TIME_SLOTS = ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"];

export const SEAT_CATEGORIES = {
  PREMIUM: { label: "Premium", price: 450, color: "#f59e0b" },
  STANDARD: { label: "Standard", price: 280, color: "#6366f1" },
  ECONOMY: { label: "Economy", price: 180, color: "#10b981" },
};

export const generateSeats = (showId, date, time) => {
  // Deterministic pseudo-random based on showId+date+time so seats feel "real"
  const seed = `${showId}-${date}-${time}`;
  const hash = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 10;
  const seats = [];

  rows.forEach((row, rowIdx) => {
    for (let col = 1; col <= seatsPerRow; col++) {
      const seatId = `${row}${col}`;
      // Determine category
      let category;
      if (rowIdx <= 1) category = "PREMIUM";
      else if (rowIdx <= 4) category = "STANDARD";
      else category = "ECONOMY";

      // Pseudo-random booked status
      const seatSeed = (hash + rowIdx * 13 + col * 7) % 100;
      const isBooked = seatSeed < 35; // ~35% booked

      seats.push({ id: seatId, row, col, category, isBooked, isSelected: false });
    }
  });
  return seats;
};
