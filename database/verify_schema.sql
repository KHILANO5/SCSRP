-- ============================================
-- Verification and Testing Queries
-- Smart Campus Service Request Portal
-- ============================================

-- Use this file to verify the schema import was successful

USE scsrp;

-- ============================================
-- 1. Check Tables Exist
-- ============================================
SHOW TABLES;

-- ============================================
-- 2. Describe Table Structures
-- ============================================
DESCRIBE users;
DESCRIBE service_requests;

-- ============================================
-- 3. Count Records
-- ============================================

-- Total users
SELECT 'Total Users' as Metric, COUNT(*) as Count FROM users;

-- Users by role
SELECT 'Users by Role' as Metric, role, COUNT(*) as count 
FROM users 
GROUP BY role;

-- Total service requests
SELECT 'Total Service Requests' as Metric, COUNT(*) as Count FROM service_requests;

-- Requests by status
SELECT 'Requests by Status' as Metric, status, COUNT(*) as count 
FROM service_requests 
GROUP BY status;

-- Requests by category
SELECT 'Requests by Category' as Metric, category, COUNT(*) as count 
FROM service_requests 
GROUP BY category
ORDER BY count DESC;

-- ============================================
-- 4. Sample Data Verification
-- ============================================

-- List all users
SELECT 
    id,
    email,
    full_name,
    role,
    created_at
FROM users
ORDER BY role, created_at;

-- List all requests with user details
SELECT 
    sr.id,
    u.full_name as 'Student Name',
    u.email as 'Student Email',
    sr.category as 'Category',
    sr.title as 'Request Title',
    sr.status as 'Status',
    sr.assigned_to as 'Assigned To',
    sr.created_at as 'Created At'
FROM service_requests sr
JOIN users u ON sr.user_id = u.id
ORDER BY sr.created_at DESC;

-- ============================================
-- 5. Status-wise Requests
-- ============================================

-- Pending requests
SELECT 
    sr.id,
    u.full_name,
    sr.category,
    sr.title,
    sr.created_at
FROM service_requests sr
JOIN users u ON sr.user_id = u.id
WHERE sr.status = 'pending'
ORDER BY sr.created_at;

-- In Progress requests
SELECT 
    sr.id,
    u.full_name,
    sr.category,
    sr.title,
    sr.assigned_to,
    sr.admin_notes,
    sr.created_at
FROM service_requests sr
JOIN users u ON sr.user_id = u.id
WHERE sr.status = 'in_progress'
ORDER BY sr.created_at;

-- Resolved requests
SELECT 
    sr.id,
    u.full_name,
    sr.category,
    sr.title,
    sr.assigned_to,
    sr.resolved_at
FROM service_requests sr
JOIN users u ON sr.user_id = u.id
WHERE sr.status = 'resolved'
ORDER BY sr.resolved_at DESC;

-- ============================================
-- 6. Advanced Analytics
-- ============================================

-- Average resolution time (for resolved requests)
SELECT 
    AVG(TIMESTAMPDIFF(HOUR, created_at, resolved_at)) as 'Avg Resolution Time (Hours)'
FROM service_requests
WHERE status = 'resolved' AND resolved_at IS NOT NULL;

-- Requests per student
SELECT 
    u.full_name,
    u.email,
    COUNT(sr.id) as 'Total Requests',
    SUM(CASE WHEN sr.status = 'pending' THEN 1 ELSE 0 END) as 'Pending',
    SUM(CASE WHEN sr.status = 'in_progress' THEN 1 ELSE 0 END) as 'In Progress',
    SUM(CASE WHEN sr.status = 'resolved' THEN 1 ELSE 0 END) as 'Resolved'
FROM users u
LEFT JOIN service_requests sr ON u.id = sr.user_id
WHERE u.role = 'student'
GROUP BY u.id, u.full_name, u.email
ORDER BY COUNT(sr.id) DESC;

-- Most common categories
SELECT 
    category,
    COUNT(*) as 'Request Count',
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM service_requests), 2) as 'Percentage'
FROM service_requests
GROUP BY category
ORDER BY COUNT(*) DESC;

-- Recent activity (last 7 days)
SELECT 
    DATE(created_at) as 'Date',
    COUNT(*) as 'Requests Created'
FROM service_requests
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY DATE(created_at)
ORDER BY DATE(created_at) DESC;

-- ============================================
-- 7. Test Queries for Development
-- ============================================

-- Get pending requests (simulating student view)
SELECT * FROM service_requests 
WHERE user_id = 1 
ORDER BY created_at DESC;

-- Get all requests (simulating admin view)
SELECT 
    sr.*,
    u.full_name,
    u.email
FROM service_requests sr
JOIN users u ON sr.user_id = u.id
ORDER BY 
    CASE sr.status
        WHEN 'pending' THEN 1
        WHEN 'in_progress' THEN 2
        WHEN 'resolved' THEN 3
    END,
    sr.created_at DESC;

-- Check indexes
SHOW INDEX FROM users;
SHOW INDEX FROM service_requests;

-- ============================================
-- Expected Results Summary
-- ============================================
-- Users: 9 total (6 students, 3 admins)
-- Service Requests: 17 total (5 pending, 5 in progress, 7 resolved)
-- Categories: 6 types (classroom, hostel, laboratory, library, administrative, other)
-- ============================================
