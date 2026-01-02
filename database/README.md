# Database Documentation

## 📂 File Structure

1.  **`schema.sql`**
    *   Contains the pure **Data Definition Language (DDL)**.
    *   Defines the database structure:
        *   `users` table
        *   `service_requests` table
    *   Includes indexes and relationships.
    *   **Usage:** Running this resets the database structure (DROPS existing tables).

2.  **`seed_data.sql`**
    *   Contains the **Data Manipulation Language (DML)**.
    *   Populates the tables with comprehensive sample data for testing.
    *   Includes:
        *   15 Users (Students & Admins)
        *   20+ Service Requests (Pending, In Progress, Resolved)

## 🚀 Setup Instructions

### 1. Initialize Schema
```bash
# Log in to MySQL
mysql -u root -p

# Create Database and Tables
mysql -u root -p scsrp < database/schema.sql
```

### 2. Import Seed Data
```bash
# Populate with sample data
mysql -u root -p scsrp < database/seed_data.sql
```

## 📋 Schema Details

### Users Table
*   `id` (PK), `email`, `password`, `full_name`, `role`
*   **Roles:** 'student' or 'admin'
*   **Passwords:** All sample accounts use `password123` (bcrypt hashed).

### Service Requests Table
*   `id` (PK), `user_id` (FK), `category`, `title`, `description`
*   `status` ('pending', 'in_progress', 'resolved')
*   `assigned_to`, `admin_notes`
*   `created_at`, `updated_at`, `resolved_at`

## 🔐 Test Accounts

**Students:**
*   `john.doe@student.university.edu`
*   `jane.smith@student.university.edu`
*   `sarah.parker@student.university.edu`

**Admins:**
*   `admin@admin.university.edu`
*   `facilities@admin.university.edu`

*Password for all:* `password123`
