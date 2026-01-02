-- ============================================
-- Smart Campus Service Request Portal
-- Database Schema
-- ============================================

-- Create Database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS scsrp;
USE scsrp;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS service_requests;
DROP TABLE IF EXISTS users;

-- ============================================
-- Table: users
-- Description: Stores user information for students and admins
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL COMMENT 'bcrypt hashed password',
    full_name VARCHAR(100) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: service_requests
-- Description: Stores all service requests submitted by students
-- ============================================
CREATE TABLE service_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category ENUM('classroom', 'hostel', 'laboratory', 'library', 'administrative', 'other') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(255) NULL COMMENT 'Optional image attachment',
    status ENUM('pending', 'in_progress', 'resolved') DEFAULT 'pending',
    admin_notes TEXT NULL COMMENT 'Admin comments and notes',
    assigned_to VARCHAR(100) NULL COMMENT 'Department or person assigned',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL COMMENT 'Timestamp when request was resolved',
    
    -- Foreign Key Constraint
    CONSTRAINT fk_user_request FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    -- Indexes for performance
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at),
    INDEX idx_status_category (status, category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
