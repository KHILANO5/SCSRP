# SCSRP - Smart Campus Service Request Portal

## 📋 Project Overview

The **Smart Campus Service Request Portal** is a centralized platform for reporting and tracking campus facilities issues (classroom, hostel, lab, etc.).

**Current Status**: Database Schema & Design Phase (Phase 1 Complete)

## 📂 Project Structure

This repository currently contains the database layer. Team members should create the `client` and `server` directories as they implement them.

```
SCSRP/
├── database/                   # MySQL Schema (Ready)
│   ├── schema.sql              # Run this to create database
│   └── verify_schema.sql       # Queries to test data
│
├── API_CONTRACT.md             # API Specification for Backend Team
├── README.md                   # Project Documentation
└── .gitignore
```

## 🚀 Getting Started

### 1. Database Team (Done ✅)
The database schema is ready.
- **File**: `database/schema.sql`
- **Action**: Import this file to set up the MySQL database with sample data.
```bash
mysql -u root -p -e "CREATE DATABASE scsrp"
mysql -u root -p scsrp < database/schema.sql
```

### 2. Backend Team (Pending ⏳)
**Role**: Create the `server/` directory.
- **Tech Stack**: Node.js, Express, MySQL, JWT.
- **Guidance**: Follow `API_CONTRACT.md` for endpoint specifications.
- Connect to the `scsrp` database created above.

### 3. Frontend Team (Pending ⏳)
**Role**: Create the `client/` directory.
- **Tech Stack**: React or Vanilla JS/HTML/CSS.
- **Guidance**: Build the UI to consume the APIs defined in `API_CONTRACT.md`.

## 📊 Database Schema Summary

- **Users Table**: Stores Students and Admins.
- **Service Requests**: Stores issues with Status (Pending, In Progress, Resolved).

## 🔐 User Role Logic (Important)

The system automatically assigns roles based on email domain during registration:

- **Student Role**: Email must end with `@student.university.edu`
- **Admin Role**: Email must end with `@admin.university.edu`

**Test Credentials (Sample Data)**:
- **Student**: `john.doe@student.edu` / `password123`
- **Admin**: `admin@campus.edu` / `password123`

---
*Created for Hackathon Project*