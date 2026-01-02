# SCSRP Client - Smart Campus Service Request Portal

## 🎨 Overview

A modern, responsive frontend application developed with **React 19** and **Vite**, designed for the Smart Campus Service Request Portal. It features a premium UI with glassmorphism effects, role-based dashboards, and real-time responsiveness.

## ✨ Features

- **⚡ Blazing Fast**: Powered by Vite and React 19.
- **🎨 Modern UI**: Custom CSS with glassmorphism, gradients, and polished animations.
- **📱 Fully Responsive**: Optimized for Desktop, Tablet, and Mobile.
- **🔐 Role-Based Access**: Specialized dashboards for **Students** and **Admins**.
- **📡 REST API Integration**: Seamless connectivity with the Node.js/Express backend.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Backend server running on port 3000

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Development Server:
   ```bash
   npm run dev
   ```

4. Open the application:
   - Local: `http://localhost:5173`

## 🏗️ Project Structure

```
client/
├── src/
│   ├── assets/         # Static assets (images, icons)
│   ├── components/     # Reusable React components
│   ├── context/        # React Context (AuthContext, etc.)
│   ├── lib/            # Utilities (API wrapper, etc.)
│   ├── pages/          # Page components (Login, Dashboard, etc.)
│   ├── App.jsx         # Main App component with Routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles & Design Tokens
├── public/             # Public static files
└── vite.config.js      # Vite configuration
```

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Variables, Flexbox/Grid)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Linting**: ESLint

## 🔐 Credentials (Development)

**Student Role:**
- Email: `john.doe@student.university.edu` (or `e2estudent@student.university.edu`)
- Password: `password123`

**Admin Role:**
- Email: `admin@admin.university.edu` (or `e2eadmin@admin.university.edu`)
- Password: `password123`

## 📄 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

