-- Additional Sample Data for Testing
-- Run this to add more test users and service requests

USE scsrp;

-- Add more students
INSERT INTO users (email, password, full_name, role) VALUES
('sarah.parker@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Sarah Parker', 'student'),
('david.lee@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'David Lee', 'student'),
('emma.watson@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Emma Watson', 'student'),
('chris.martin@student.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Chris Martin', 'student');

-- Add more admins
INSERT INTO users (email, password, full_name, role) VALUES
('facilities@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Facilities Manager', 'admin'),
('maintenance@admin.university.edu', '$2b$10$YFQGqJ.7v5W5nVB5m5m5m.uQqJ.7v5W5nVB5m5m5m5m5m5m5m5m5m', 'Maintenance Head', 'admin');

-- Add more service requests (recent)
INSERT INTO service_requests (user_id, category, title, description, status, created_at) VALUES
-- Recent pending requests
(10, 'classroom', 'Smart board not responding in Room 405', 'The touch screen on the smart board is completely unresponsive. Cannot conduct interactive lectures.', 'pending', NOW()),
(11, 'laboratory', 'Chemistry Lab - Gas leak detected', 'Strong gas smell in Chemistry Lab 3. Need immediate inspection for safety.', 'pending', DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
(12, 'hostel', 'Hot water not available in Block D', 'No hot water supply in entire Block D for the past 3 days. Students are complaining.', 'pending', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(13, 'library', 'Printer out of paper in Study Area', 'All printers in the study area are out of paper. Students unable to print assignments.', 'pending', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(10, 'administrative', 'Student ID card scanner malfunction', 'The ID scanner at main gate is not working. Causing delays during entry.', 'pending', DATE_SUB(NOW(), INTERVAL 4 HOUR)),

-- Some in progress
(11, 'classroom', 'Broken desk in Lecture Hall 2', 'Multiple desks in Lecture Hall 2 have broken legs. Students cannot sit properly.', 'in_progress', DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(12, 'laboratory', 'Computer Lab 4 - Network connectivity issues', 'All computers in Lab 4 losing network connection intermittently.', 'in_progress', DATE_SUB(NOW(), INTERVAL 8 HOUR)),
(13, 'hostel', 'Elevator stuck in Block C', 'Elevator on Block C has been stuck on 3rd floor since morning. Residents using stairs.', 'in_progress', DATE_SUB(NOW(), INTERVAL 10 HOUR)),

-- Some resolved
(10, 'library', 'Air conditioning too cold', 'AC temperature in reading room is set too low. Students feeling uncomfortable.', 'resolved', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(11, 'other', 'Parking lot lights not working', 'Several lights in student parking lot are not working. Safety concern during night.', 'resolved', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Update in-progress requests with admin details
UPDATE service_requests 
SET assigned_to = 'Furniture Department', 
    admin_notes = 'New desks ordered. Installation scheduled for tomorrow morning.'
WHERE title = 'Broken desk in Lecture Hall 2';

UPDATE service_requests 
SET assigned_to = 'IT Network Team', 
    admin_notes = 'Network switch issue identified. Replacement switch being installed today.'
WHERE title LIKE '%Network connectivity issues%';

UPDATE service_requests 
SET assigned_to = 'Building Maintenance', 
    admin_notes = 'Elevator technician on site. Expect to resolve within 2 hours.'
WHERE title LIKE '%Elevator stuck%';

-- Update resolved requests
UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 1 DAY),
    assigned_to = 'HVAC Team',
    admin_notes = 'AC temperature adjusted to 22°C. Issue resolved.'
WHERE title LIKE '%Air conditioning too cold%' AND status = 'resolved';

UPDATE service_requests 
SET resolved_at = DATE_SUB(NOW(), INTERVAL 2 DAY),
    assigned_to = 'Electrical Department',
    admin_notes = 'All faulty lights replaced. Parking lot fully illuminated now.'
WHERE title LIKE '%Parking lot lights%' AND status = 'resolved';

-- Verify the additions
SELECT 'Total Users Now' as Info, COUNT(*) as Count FROM users;
SELECT 'Total Requests Now' as Info, COUNT(*) as Count FROM service_requests;
SELECT 'Requests by Status' as Info, status, COUNT(*) as Count FROM service_requests GROUP BY status;
