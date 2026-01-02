# SCSRP - Smart Campus Service Request Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## 📋 Overview

A full-stack web application for managing campus facility service requests. Students can report issues (classroom, hostel, laboratory, library, etc.), and administrators can track, assign, and resolve them efficiently.

**Features:**
- 🔐 Role-based authentication (Student/Admin)
- 📝 Service request management with image uploads
- 🎯 Real-time status tracking (Pending, In Progress, Resolved)
- 📊 Admin dashboard with statistics
- 🔍 Advanced filtering and search
- 📱 RESTful API architecture

## 🏗️ Project Structure

```
SCSRP/
├── server/                     # Backend API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Auth, upload handlers
│   │   ├── routes/            # API endpoints
│   │   ├── models/            # Database connection
│   │   ├── types/             # TypeScript definitions
│   │   └── utils/             # JWT utilities
│   ├── uploads/               # File storage
│   └── package.json
│
├── database/                   # MySQL Schema & Sample Data
│   ├── schema.sql             # Main database schema
│   ├── additional_data.sql    # Extra test data
│   └── verify_schema.sql      # Verification queries
│
├── client/                     # Frontend (To be implemented)
│
├── docs/                       # Documentation
│
├── API_CONTRACT.md            # Complete API specification
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16+ and npm
- **MySQL** v8.0+
- **Git**

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/SCSRP.git
cd SCSRP
```

### 2. Database Setup

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE scsrp"

# Import schema with sample data
mysql -u root -p scsrp < database/schema.sql

# (Optional) Add more test data
mysql -u root -p scsrp < database/additional_data.sql
```

### 3. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MySQL credentials

# Run development server
npm run dev

# Or build for production
npm run build
npm start
```

The server will start at `http://localhost:3000`

### 4. Test the API

Use Postman, cURL, or any HTTP client to test endpoints as documented in `API_CONTRACT.md`

## 🔐 Authentication

### Email Domain-Based Roles

The system automatically assigns roles during registration:

- `@student.university.edu` → **Student** role
- `@admin.university.edu` → **Admin** role
- Other domains → Registration rejected

### Sample Test Accounts

After running `schema.sql`:

**Students:**
- `john.doe@student.university.edu` / `password123`
- `jane.smith@student.university.edu` / `password123`

**Admins:**
- `admin@admin.university.edu` / `password123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT token)

### Student Operations
- `POST /api/requests` - Create service request
- `GET /api/requests` - Get user's requests
- `GET /api/requests/:id` - Get specific request

### Admin Operations
- `GET /api/admin/requests` - Get all requests
- `PUT /api/admin/requests/:id/status` - Update status
- `PUT /api/admin/requests/:id/assign` - Assign to department
- `PUT /api/admin/requests/:id/notes` - Add admin notes
- `GET /api/admin/statistics` - Dashboard statistics

See [API_CONTRACT.md](API_CONTRACT.md) for complete documentation.

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- TypeScript
- MySQL with mysql2
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

**Database:**
- MySQL 8.0+

**Frontend:** (To be implemented)
- React/Vue/Angular or HTML/CSS/JS

## 📊 Database Schema

### Users Table
- `id`, `email`, `password`, `full_name`, `role`, `created_at`

### Service Requests Table
- `id`, `user_id`, `category`, `title`, `description`, `image_path`
- `status`, `admin_notes`, `assigned_to`
- `created_at`, `updated_at`, `resolved_at`

## 🔧 Development

```bash
# Install dependencies
cd server && npm install

# Run in development mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Built for campus facility management
- Inspired by modern ticketing systems

---

**Status:** ✅ Backend Complete | ⏳ Frontend Pending | ✅ Database Complete