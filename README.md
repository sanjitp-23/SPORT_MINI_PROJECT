
# 🛡️ SPORTS: Smart Platform for Opportunities, Recreation, Tournaments & Skills

## 📌 Project Overview

**SPORTS** is a full-stack web application designed to revolutionize the grassroots sports ecosystem. By combining tournament management with professional networking, it bridges the gap between recreational play and professional career building.

This system serves as a unified platform for:
* **Athletes:** To build verified digital portfolios and find teams.
* **Organizers:** To manage tournaments, brackets, and scorekeeping.
* **Venue Owners:** To manage turf bookings and time slots.
* **Recruiters:** To scout talent based on verified performance data.

The goal is to eliminate the fragmentation of sports coordination, democratize access to opportunities, and provide a "LinkedIn-style" professional identity for every athlete.
![WhatsApp Image 2025-12-21 at 11 02 42 PM](https://github.com/user-attachments/assets/8950cd97-63c6-406c-8d04-473c2fc06d52)


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

## Web App
<img width="1737" height="827" alt="image" src="https://github.com/user-attachments/assets/b42e4f2f-a0c2-48a6-b7a0-d80caf19d98d" />
<img width="1726" height="840" alt="image" src="https://github.com/user-attachments/assets/0680fb48-f240-44db-bd7f-ef8bd583e591" />
<img width="1729" height="822" alt="image" src="https://github.com/user-attachments/assets/4eb1c10a-8599-4e30-8b5d-ced9f0691269" />
<img width="1751" height="836" alt="image" src="https://github.com/user-attachments/assets/62e4e1f4-b61f-493b-b022-6e5e5cbe9a85" />
<img width="1747" height="851" alt="image" src="https://github.com/user-attachments/assets/22169a7b-1412-4abf-8015-00921f92b851" />
<img width="1746" height="837" alt="image" src="https://github.com/user-attachments/assets/7a82d0b0-009e-4574-ab26-de324ef82b94" />
<img width="1742" height="831" alt="image" src="https://github.com/user-attachments/assets/a0fecd8c-df3c-493e-b49a-8b82767d55be" />
<img width="1749" height="839" alt="image" src="https://github.com/user-attachments/assets/ebd25dcb-a73d-4698-ba82-43b567fc0ced" />
<img width="1771" height="839" alt="image" src="https://github.com/user-attachments/assets/990e9160-923e-4ede-a2fd-47b6f8cadbed" />



## 📄 License

This project is licensed under the MIT License. You are free to use, modify, and distribute this project with attribution.

```

```
