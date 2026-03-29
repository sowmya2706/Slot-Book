# 🎭 SlotBook — Show Slot Booking App

A production-grade, generic **slot booking application** built with React JS. Supports any type of show or event — movies, concerts, theatre, appointments, and more.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?logo=css3)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 **Show Selection** | Browse available shows with genre, duration, and rating |
| 📅 **Date & Time Picker** | Scrollable 14-day date strip with multiple time slots per day |
| 💺 **Seat Map** | Visual seat grid with Premium / Standard / Economy categories and live availability |
| 🧾 **Booking Confirmation** | Customer details form with validation + price breakdown |
| ✅ **Booking Success** | Ticket summary with unique booking ID |
| 🛠️ **Admin Dashboard** | View all bookings, filter by status, search, cancel bookings, revenue stats |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm ≥ 8

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/slot-booking-app.git

# Navigate into the project
cd slot-booking-app

# Install dependencies
npm install

# Start the development server
npm start
```

The app runs at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Home.js                  # Show listing page
│   ├── SeatsPage.js             # Seat selection wrapper
│   ├── BookingSuccess.js        # Post-booking confirmation
│   ├── Navbar.js                # Sticky nav with breadcrumb
│   ├── DateTimePicker/
│   │   └── DateTimePicker.js    # Date strip + time slot grid
│   ├── SeatMap/
│   │   └── SeatMap.js           # Interactive seat grid
│   ├── BookingConfirmation/
│   │   └── BookingConfirmation.js  # Customer form + price breakdown
│   └── AdminPanel/
│       └── AdminPanel.js        # Booking management dashboard
├── context/
│   └── BookingContext.js        # Global state via useReducer + Context API
├── data/
│   └── mockData.js              # Shows, time slots, seat categories, seat generator
├── App.js                       # Step-based router
└── index.js                     # Entry point
```

---

## 🧠 Architecture Decisions

### State Management
Uses **React Context API + useReducer** (no external library) to manage:
- Selected show, date, time, and seats
- Multi-step booking flow (`home → seats → confirm → success`)
- Admin booking records with cancel functionality

This pattern mirrors Redux without the overhead — appropriate for this app's complexity.

### Seat Generation
Seats are **deterministically generated** per `(showId, date, time)` combination using a lightweight hash function. This simulates realistic availability without a backend — same inputs always yield the same availability map.

### Component Architecture
- **Presentational + Container separation** — `SeatsPage` composes `DateTimePicker` and `SeatMap` independently
- **Single source of truth** — all booking state lives in `BookingContext`
- **CSS Modules pattern** — each component owns its stylesheet, no global conflicts

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary font | `DM Sans` |
| Display font | `Playfair Display` |
| Mono font | `Space Mono` |
| Background | `#0d0d0f` |
| Accent | `#eab308` (Amber) |
| Premium seats | `#f59e0b` |
| Standard seats | `#6366f1` |
| Economy seats | `#10b981` |

---

## 📸 App Flow

```
Home (Show Selection)
    ↓
Seats Page
  ├── Date Picker (14-day strip)
  ├── Time Slot Selector
  └── Seat Map (80 seats, 3 categories)
    ↓
Booking Confirmation
  ├── Summary panel
  ├── Customer details form
  └── Price breakdown
    ↓
Booking Success (Ticket view)
    ↓
Admin Panel (optional)
  ├── Stats dashboard
  ├── Search & filter
  └── Cancel bookings
```

---

## 🔧 Potential Enhancements

- [ ] Backend integration (Node.js + Express REST API)
- [ ] Real-time seat locking with WebSockets
- [ ] Authentication (user login + booking history)
- [ ] Payment gateway integration (Razorpay / Stripe)
- [ ] Email confirmation via NodeMailer
- [ ] Seat hold timer (release if not confirmed in 5 min)
- [ ] Unit tests with Jest + React Testing Library

---

## 🛠️ Tech Stack

- **React 18** — UI library
- **JavaScript ES6+** — Language
- **Context API + useReducer** — State management
- **CSS3 Custom Properties** — Theming and design tokens
- **Google Fonts** — Playfair Display, Space Mono, DM Sans

---

## 📄 License

MIT © Sowmya R
