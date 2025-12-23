
# 🛡️ SPORTS: Smart Platform for Opportunities, Recreation, Tournaments & Skills

## 📌 Project Overview

**SPORTS** is a full-stack web application designed to revolutionize the grassroots sports ecosystem. By combining tournament management with professional networking, it bridges the gap between recreational play and professional career building.

This system serves as a unified platform for:
* **Athletes:** To build verified digital portfolios and find teams.
* **Organizers:** To manage tournaments, brackets, and scorekeeping.
* **Venue Owners:** To manage turf bookings and time slots.
* **Recruiters:** To scout talent based on verified performance data.

The goal is to eliminate the fragmentation of sports coordination, democratize access to opportunities, and provide a "LinkedIn-style" professional identity for every athlete.

## 🎯 Objectives

* **Centralize Sports Data:** Unified platform for stats, bookings, and networking.
* **Verify Athlete Credibility:** Document-based verification system (The "Blue Tick").
* **Streamline Operations:** Automated tournament brackets and real-time turf booking.
* **Empower Careers:** A dedicated hub for sponsorships and sports recruitment.
* **Build Community:** A "Need Players" forum to connect athletes locally.

## ✨ Key Features

### 🏆 Tournament & Competition Management
* **Real-Time Brackets:** Automated visualization of tournament progress.
* **Live Score Updates:** Instant updates for ongoing matches.
* **Easy Registration:** Seamless team enrollment and fee handling.

### 💼 Professional Career Hub
* **Verified Profiles:** Digital CVs showcasing "locked" stats from official matches.
* **Identity Verification:** Admin-led review of certificates and IDs.
* **Job Board:** Listings for coaching gigs, sponsorships, and team tryouts.

### ⚡ Utility & Recreation
* **Turf Booking Engine:** Real-time slot availability and instant booking.
* **Teammate Finder:** Geo-tagged lobby to find players for casual games.
* **Social Feed:** Community updates and achievement sharing.

## 🗂️ Repository Structure

```bash
SPORT_MINI_PROJECT/
│
├── public/              # Public assets (Logos, Hero Images, Static files)
├── src/                 # Main application source code
│   ├── components/      # Reusable UI components (Cards, Navbar, Sidebar)
│   ├── pages/           # Application pages (Dashboard, Tournaments, Profile)
│   ├── services/        # API services and Supabase clients
│   └── utils/           # Helper functions and hooks
│
├── index.html           # Application entry point
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration (Orange/Black Theme)
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── .gitignore           # Git ignored files
└── README.md            # Project documentation

```

## 🛠️ Tech Stack

**Frontend**

* React.js
* TypeScript
* Tailwind CSS (Custom Orange/Dark Theme)
* Shadcn UI
* Vite

**Backend / Database**

* Supabase (PostgreSQL, Auth, Real-time)
* Node.js (Optional custom logic)

**Security & Logic**

* Row Level Security (RLS)
* JWT Authentication

## ⚙️ Installation & Setup

**1️⃣ Clone the Repository**

```bash
git clone [https://github.com/sanjitp-23/SPORT_MINI_PROJECT.git](https://github.com/sanjitp-23/SPORT_MINI_PROJECT.git)
cd SPORT_MINI_PROJECT

```

**2️⃣ Install Dependencies**

```bash
npm install

```

**3️⃣ Configure Environment**
Create a `.env` file in the root directory and add your Supabase keys:


**4️⃣ Run the Development Server**

```bash
npm run dev

```

The application will start locally and can be accessed via:
`http://localhost:5173`

## 🧠 User Flow

1. **Onboarding:** User signs up -> Selects Sport -> Uploads ID for Verification.
2. **Action:** User books a turf -> Joins a Tournament -> Plays Match.
3. **Data:** Organizer updates scores -> User stats update automatically.
4. **Growth:** User applies for opportunities using their verified profile.

## 📊 Usage

* **Start the application:** Run the dev server.
* **Create an Account:** Sign up as an Athlete or Organizer.
* **Explore:** Browse live tournaments or book a venue.
* **Verify:** Submit documents to earn the verified badge.

## 🧪 Future Enhancements

* **Mobile App:** React Native version for on-field usage.
* **Live Streaming:** Integrated video streaming for tournament finals.
* **AI Analytics:** Performance analysis and scouting recommendations.
* **Payment Gateway:** Integrated payments for entry fees and booking.

## 📄 License

This project is licensed under the MIT License. You are free to use, modify, and distribute this project with attribution.

```

```
