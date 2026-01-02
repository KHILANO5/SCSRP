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

-- ============================================
-- Sample Data
-- ============================================

-- Insert Sample Users
-- Note: Password is 'password123' hashed with bcrypt (10 rounds)
-- Hash: $2b$10$rKZLQqN5Z5Z5Z5Z5Z5Z5ZuYVw0vZ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5
-- For production, use actual bcrypt hashes

INSERT INTO users (email, password, full_name, role) VALUES
-- Students
('john.doe@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'John Doe', 'student'),
('jane.smith@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Jane Smith', 'student'),
('alice.wilson@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Alice Wilson', 'student'),
('bob.johnson@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Bob Johnson', 'student'),
('emily.davis@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Emily Davis', 'student'),
('michael.brown@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Michael Brown', 'student'),

-- Admins
('admin@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Admin User', 'admin'),
('sarah.admin@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Sarah Anderson', 'admin'),
('tech.support@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Tech Support Admin', 'admin');

-- Insert Sample Service Requests

-- Pending Requests
INSERT INTO service_requests (user_id, category, title, description, status, created_at) VALUES
(1, 'classroom', 'Projector not working in Room 301', 'The projector in classroom 301 is not turning on. We have an important presentation tomorrow. Please fix it urgently.', 'pending', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, 'hostel', 'Water leakage in Hostel Block B', 'There is continuous water leakage from the ceiling in Room 205, Block B. The entire room is getting wet.', 'pending', DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(3, 'library', 'AC not working in Reading Hall', 'The air conditioning in the main reading hall has stopped working. It is very hot and uncomfortable to study.', 'pending', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 'laboratory', 'Computer Lab 2 - Multiple PCs not booting', 'Around 5 computers in Computer Lab 2 are not booting up. Students are unable to complete their assignments.', 'pending', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(5, 'administrative', 'ID Card Printing Machine Down', 'The ID card printing machine at the admin office is not working. Need urgent repair.', 'pending', DATE_SUB(NOW(), INTERVAL 6 HOUR)),

-- In Progress Requests
(2, 'classroom', 'Broken chairs in Room 105', 'Multiple chairs in classroom 105 are broken and uncomfortable to sit on. Need replacement.', 'in_progress', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 'hostel', 'WiFi connectivity issues in Block A', 'WiFi is very slow and keeps disconnecting in Hostel Block A, Floor 3.', 'in_progress', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 'laboratory', 'Microscopes need calibration in Biology Lab', 'Several microscopes in the biology lab are out of focus and need professional calibration.', 'in_progress', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(6, 'library', 'Insufficient lighting in reference section', 'The reference section of the library has very dim lighting. Students are having difficulty reading.', 'in_progress', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(1, 'other', 'Parking lot pothole repair needed', 'Large potholes in the student parking lot near Gate 2. Risk of vehicle damage.', 'in_progress', DATE_SUB(NOW(), INTERVAL 4 DAY)),

-- Resolved Requests
(1, 'classroom', 'Whiteboard markers needed in Room 202', 'All whiteboard markers in Room 202 are dried out. Please replace them.', 'resolved', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 'hostel', 'Broken window in Room 310', 'The window glass in my hostel room (310) is cracked and needs replacement.', 'resolved', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(6, 'laboratory', 'Chemistry Lab - Fume hood not working', 'The fume hood in Chemistry Lab is not extracting properly. Safety concern.', 'resolved', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(2, 'library', 'Book request: Advanced Database Management', 'Please add more copies of "Advanced Database Management" by Ramakrishnan. Only 1 copy available.', 'resolved', DATE_SUB(NOW(), INTERVAL 8 DAY)),
(4, 'administrative', 'Certificate collection delay', 'My course completion certificate was supposed to be ready last week. Still not available.', 'resolved', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(3, 'classroom', 'Sound system issues in Auditorium', 'The microphone and speakers in the main auditorium are producing static noise.', 'resolved', DATE_SUB(NOW(), INTERVAL 9 DAY)),
(5, 'other', 'Drinking water cooler empty in Block C', 'The water cooler on the 2nd floor of Academic Block C has been empty for 2 days.', 'resolved', DATE_SUB(NOW(), INTERVAL 4 DAY));

-- Update In Progress Requests with assignments and admin notes
UPDATE service_requests 
SET assigned_to = 'IT Department', 
    admin_notes = 'Technician dispatched to check the issue. WiFi router replacement scheduled.'
WHERE id IN (SELECT id FROM (SELECT id FROM service_requests WHERE status = 'in_progress' AND category = 'hostel') AS temp);

UPDATE service_requests 
SET assigned_to = 'Maintenance Team', 
    admin_notes = 'Furniture replacement order placed. Expected delivery in 2 days.'
WHERE id IN (SELECT id FROM (SELECT id FROM service_requests WHERE status = 'in_progress' AND category = 'classroom' AND title LIKE '%chairs%') AS temp);

UPDATE service_requests 
SET assigned_to = 'Laboratory Technician', 
    admin_notes = 'Scheduled for calibration on next Monday. External specialist will be called.'
WHERE id IN (SELECT id FROM (SELECT id FROM service_requests WHERE status = 'in_progress' AND category = 'laboratory') AS temp);

UPDATE service_requests 
SET assigned_to = 'Electrical Department', 
    admin_notes = 'LED tube lights ordered. Installation planned for tomorrow.'
WHERE id IN (SELECT id FROM (SELECT id FROM service_requests WHERE status = 'in_progress' AND category = 'library') AS temp);

UPDATE service_requests 
SET assigned_to = 'Campus Maintenance', 
    admin_notes = 'Road repair work scheduled for this weekend.'
WHERE id IN (SELECT id FROM (SELECT id FROM service_requests WHERE status = 'in_progress' AND category = 'other') AS temp);

-- Update Resolved Requests with resolution timestamps
UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 4 DAY),
    assigned_to = 'Stores Department',
    admin_notes = 'New markers supplied to the classroom.'
WHERE status = 'resolved' AND title LIKE '%markers%';

UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 6 DAY),
    assigned_to = 'Hostel Maintenance',
    admin_notes = 'Window glass replaced successfully.'
WHERE status = 'resolved' AND title LIKE '%window%';

UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 5 DAY),
    assigned_to = 'Lab Safety Team',
    admin_notes = 'Fume hood motor repaired and tested. Working properly now.'
WHERE status = 'resolved' AND title LIKE '%Fume hood%';

UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 7 DAY),
    assigned_to = 'Library Administration',
    admin_notes = '5 additional copies of the book have been added to the library collection.'
WHERE status = 'resolved' AND category = 'library' AND title LIKE '%Book request%';

UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 9 DAY),
    assigned_to = 'Academic Office',
    admin_notes = 'Certificate issued and available for collection at counter 3.'
WHERE status = 'resolved' AND title LIKE '%Certificate%';

UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 8 DAY),
    assigned_to = 'Audio-Visual Team',
    admin_notes = 'Sound system serviced. Replaced faulty connectors and tested.'
WHERE status = 'resolved' AND title LIKE '%Sound system%';

UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 3 DAY),
    assigned_to = 'Housekeeping',
    admin_notes = 'Water cooler refilled and scheduled for regular maintenance.'
WHERE status = 'resolved' AND title LIKE '%water cooler%';

-- ============================================
-- Verification Queries
-- ============================================

-- Uncomment below to verify data after import

-- Check total users
-- SELECT role, COUNT(*) as count FROM users GROUP BY role;

-- Check requests by status
-- SELECT status, COUNT(*) as count FROM service_requests GROUP BY status;

-- Check requests by category
-- SELECT category, COUNT(*) as count FROM service_requests GROUP BY category;

-- View all requests with user info
-- SELECT 
--     sr.id,
--     u.full_name as student_name,
--     u.email as student_email,
--     sr.category,
--     sr.title,
--     sr.status,
--     sr.assigned_to,
--     sr.created_at
-- FROM service_requests sr
-- JOIN users u ON sr.user_id = u.id
-- ORDER BY sr.created_at DESC;

-- ============================================
-- Notes for Team
-- ============================================
-- 1. Default password for all sample users: 'password123'
-- 2. Remember to hash passwords properly in production using bcrypt
-- 3. The sample bcrypt hash provided is a placeholder
-- 4. Total sample data:
--    - 9 users (6 students + 3 admins)
--    - 17 service requests (5 pending, 5 in progress, 7 resolved)
-- 5. To import this schema:
--    mysql -u root -p scsrp < backend/models/schema.sql
-- ============================================
