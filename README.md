# SCSRP - Smart Campus Service Request Portal

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Overview

A full-stack web application for managing campus facility service requests. Students can report issues (classroom, hostel, laboratory, library, etc.), and administrators can track, assign, and resolve them efficiently.

**Features:**
- 🔐 **Role-Based Auth**: Secure JWT authentication for Students and Admins.
- 📝 **Request Management**: Create, view, and track service requests with status updates.
- 🎨 **Modern Frontend**: Built with React & Vite, featuring a premium glassmorphism design.
- 📱 **Mobile Responsive**: Fully adaptive UI for all devices.
- 📊 **Admin Dashboard**: Specialized view for request tracking and status management.
- 🚀 **RESTful API**: Robust backend architecture using Node.js, Express, and MySQL.

## 🏗️ Tech Stack

**Frontend (`/client`):**
- React 19 + Vite
- React Router DOM
- CSS3 (Variables, Flexbox, Grid)
- Lucide React Icons

**Backend (`/server`):**
- Node.js + Express
- TypeScript
- MySQL (mysql2)
- JWT & bcrypt
- Multer (File Uploads)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MySQL Server (v8.0+)
- Git

### 1. Database Setup
```bash
# Log in to MySQL
mysql -u root -p

# Create Database and Import Schema
mysql -u root -p < database/schema.sql
```
*Note: The schema includes sample users but check `database/schema.sql` for details.*

### 2. Backend Setup
```bash
cd server

# Install Dependencies
npm install

# Configure Environment
cp .env.example .env
# Edit .env with your MySQL credentials

# Start Server
npm run dev
```
Server runs at `http://localhost:3000`.

### 3. Frontend Setup
```bash
cd client

# Install Dependencies
npm install

# Start Client
npm run dev
```
Client runs at `http://localhost:5173`.

## 🔐 Test Credentials

**Student Role:**
- Email: `john.smith@student.university.edu` (if registered)
- *Note: You can register any email ending in `@student.university.edu` to create a Student account.*

**Admin Role:**
- Email: `admin@admin.university.edu` (if registered)
- *Note: You can register any email ending in `@admin.university.edu` to create an Admin account.*

*Tip: The sample users in `schema.sql` might have placeholder hashes. It is recommended to register new users via the UI for testing.*

## 📂 Project Structure

```
SCSRP/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # UI Components
│   │   ├── pages/             # Route Pages
│   │   └── context/           # State Management
│   └── vite.config.js
│
├── server/                     # Node.js Backend
│   ├── src/
│   │   ├── controllers/       # Business Logic
│   │   ├── models/            # Database Access
│   │   └── routes/            # API Endpoints
│   └── uploads/               # User uploaded files
│
├── database/                   # SQL Scripts
│   └── schema.sql             # Database Schema & Seed
│
└── README.md                   # Project Documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.