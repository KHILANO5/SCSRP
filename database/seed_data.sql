-- ============================================
-- Smart Campus Service Request Portal
-- Seed Data / Sample Data
-- Description: Initial data for testing and development
-- ============================================

USE scsrp;

-- ============================================
-- 1. Insert Users
-- Note: All passwords are 'password123'
-- Hash: $2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m
-- ============================================

INSERT INTO users (email, password, full_name, role) VALUES
-- Students
('john.doe@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'John Doe', 'student'),
('jane.smith@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Jane Smith', 'student'),
('alice.wilson@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Alice Wilson', 'student'),
('bob.johnson@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Bob Johnson', 'student'),
('emily.davis@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Emily Davis', 'student'),
('michael.brown@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Michael Brown', 'student'),
-- Additional Students
('sarah.parker@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Sarah Parker', 'student'),
('david.lee@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'David Lee', 'student'),
('emma.watson@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Emma Watson', 'student'),
('chris.martin@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Chris Martin', 'student'),

-- Admins
('admin@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Admin User', 'admin'),
('sarah.admin@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Sarah Anderson', 'admin'),
('tech.support@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Tech Support Admin', 'admin'),
-- Additional Admins
('facilities@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Facilities Manager', 'admin'),
('maintenance@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Maintenance Head', 'admin');

-- ============================================
-- 2. Insert Service Requests
-- ============================================

-- Pending Requests
INSERT INTO service_requests (user_id, category, title, description, status, created_at) VALUES
(1, 'classroom', 'Projector not working in Room 301', 'The projector in classroom 301 is not turning on.', 'pending', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(2, 'hostel', 'Water leakage in Hostel Block B', 'There is continuous water leakage from the ceiling in Room 205.', 'pending', DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(3, 'library', 'AC not working in Reading Hall', 'The air conditioning in the main reading hall has stopped working.', 'pending', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 'laboratory', 'Computer Lab 2 - Multiple PCs not booting', 'Around 5 computers in Computer Lab 2 are not booting up.', 'pending', DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(5, 'administrative', 'ID Card Printing Machine Down', 'The ID card printing machine at the admin office is not working.', 'pending', DATE_SUB(NOW(), INTERVAL 6 HOUR)),
-- Recent Pending
(1, 'classroom', 'Smart board not responding in Room 405', 'The touch screen on the smart board is completely unresponsive.', 'pending', NOW()),
(2, 'laboratory', 'Chemistry Lab - Gas leak detected', 'Strong gas smell in Chemistry Lab 3. Need immediate inspection.', 'pending', DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
(3, 'hostel', 'Hot water not available in Block D', 'No hot water supply in entire Block D for the past 3 days.', 'pending', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(4, 'library', 'Printer out of paper in Study Area', 'All printers in the study area are out of paper.', 'pending', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(5, 'administrative', 'Student ID card scanner malfunction', 'The ID scanner at main gate is not working.', 'pending', DATE_SUB(NOW(), INTERVAL 4 HOUR));

-- In Progress Requests
INSERT INTO service_requests (user_id, category, title, description, status, assigned_to, admin_notes, created_at) VALUES
(2, 'classroom', 'Broken chairs in Room 105', 'Multiple chairs in classroom 105 are broken.', 'in_progress', 'Maintenance Team', 'Furniture replacement order placed.', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 'hostel', 'WiFi connectivity issues in Block A', 'WiFi is very slow and keeps disconnecting.', 'in_progress', 'IT Department', 'Technician dispatched to check the issue.', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 'laboratory', 'Microscopes need calibration', 'Several microscopes in the biology lab are out of focus.', 'in_progress', 'Laboratory Technician', 'Scheduled for calibration.', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(1, 'classroom', 'Broken desk in Lecture Hall 2', 'Multiple desks in Lecture Hall 2 have broken legs.', 'in_progress', 'Furniture Department', 'New desks ordered.', DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(2, 'laboratory', 'Computer Lab 4 - Network issues', 'All computers in Lab 4 losing network connection.', 'in_progress', 'IT Network Team', 'Network switch replacement scheduled.', DATE_SUB(NOW(), INTERVAL 8 HOUR));

-- Resolved Requests
INSERT INTO service_requests (user_id, category, title, description, status, assigned_to, admin_notes, created_at, resolved_at) VALUES
(1, 'classroom', 'Whiteboard markers needed', 'All whiteboard markers in Room 202 are dried out.', 'resolved', 'Stores Department', 'New markers supplied.', DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 4 DAY)),
(5, 'hostel', 'Broken window in Room 310', 'The window glass in my hostel room is cracked.', 'resolved', 'Hostel Maintenance', 'Window glass replaced.', DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 6 DAY)),
(6, 'laboratory', 'Fume hood not working', 'The fume hood in Chemistry Lab is not extracting.', 'resolved', 'Lab Safety Team', 'Fume hood motor repaired.', DATE_SUB(NOW(), INTERVAL 6 DAY), DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 'library', 'Air conditioning too cold', 'AC temperature in reading room is too low.', 'resolved', 'HVAC Team', 'AC temperature adjusted.', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
(4, 'other', 'Parking lot lights not working', 'Several lights in student parking lot are not working.', 'resolved', 'Electrical Department', 'Faulty lights replaced.', DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY));

