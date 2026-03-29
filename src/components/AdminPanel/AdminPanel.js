// src/components/AdminPanel/AdminPanel.js
import React, { useState } from "react";
import { useBooking } from "../../context/BookingContext";
import "./AdminPanel.css";

export default function AdminPanel() {
  const { state, dispatch } = useBooking();
  const { adminBookings } = state;
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = adminBookings.filter((b) => {
    const matchStatus = filter === "all" || b.status === filter;
    const matchSearch =
      !search ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      b.show.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: adminBookings.length,
    confirmed: adminBookings.filter((b) => b.status === "confirmed").length,
    cancelled: adminBookings.filter((b) => b.status === "cancelled").length,
    revenue: adminBookings
      .filter((b) => b.status === "confirmed")
      .reduce((acc, b) => acc + b.total, 0),
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <div>
          <h2 className="admin-title">Admin Dashboard</h2>
          <p className="admin-sub">Manage all slot bookings</p>
        </div>
        <button className="back-home-btn" onClick={() => dispatch({ type: "RESET" })}>
          ← Back to Shows
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { label: "Total Bookings", value: stats.total, icon: "🎫" },
          { label: "Confirmed", value: stats.confirmed, icon: "✅" },
          { label: "Cancelled", value: stats.cancelled, icon: "❌" },
          { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: "💰" },
        ].map(({ label, value, icon }) => (
          <div className="stat-card" key={label}>
            <span className="stat-icon">{icon}</span>
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-controls">
        <input
          className="admin-search"
          placeholder="Search by ID, name, or show..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-tabs">
          {["all", "confirmed", "cancelled"].map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          {adminBookings.length === 0
            ? "No bookings yet. Go book some shows! 🎭"
            : "No bookings match your filter."}
        </div>
      ) : (
        <div className="bookings-table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                {["Booking ID", "Customer", "Show", "Date & Time", "Seats", "Amount", "Status", "Action"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className={b.status === "cancelled" ? "row-cancelled" : ""}>
                  <td className="mono">{b.id}</td>
                  <td>
                    <div className="customer-name">{b.customer.name}</div>
                    <div className="customer-email">{b.customer.email}</div>
                  </td>
                  <td>{b.show.poster} {b.show.title}</td>
                  <td>
                    <div>{new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                    <div className="mono small">{b.time}</div>
                  </td>
                  <td className="mono">{b.seats.map((s) => s.id).join(", ")}</td>
                  <td className="mono">₹{b.total.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${b.status}`}>{b.status}</span>
                  </td>
                  <td>
                    {b.status === "confirmed" && (
                      <button
                        className="cancel-btn"
                        onClick={() => dispatch({ type: "CANCEL_BOOKING", payload: b.id })}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
