# Database Documentation

MySQL database schema and sample data for Smart Campus Service Request Portal.

## 📊 Schema Overview

### Tables

1. **users** - User accounts (students and admins)
2. **service_requests** - Campus facility service requests

## 🚀 Setup Instructions

### 1. Create Database

```bash
mysql -u root -p -e "CREATE DATABASE scsrp"
```

### 2. Import Schema

```bash
# Import main schema with initial sample data
mysql -u root -p scsrp < schema.sql
```

### 3. (Optional) Add More Test Data

```bash
# Import additional test data
mysql -u root -p scsrp < additional_data.sql
```

### 4. Verify Installation

```bash
# Run verification queries
mysql -u root -p scsrp < verify_schema.sql
```

## 📋 Schema Details

### Users Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- bcrypt hashed
    full_name VARCHAR(100) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `idx_email` on email (for fast lookups)
- `idx_role` on role (for filtering)

### Service Requests Table

```sql
CREATE TABLE service_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category ENUM('classroom', 'hostel', 'laboratory', 
                  'library', 'administrative', 'other') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR(255) NULL,
    status ENUM('pending', 'in_progress', 'resolved') DEFAULT 'pending',
    admin_notes TEXT NULL,
    assigned_to VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Indexes:**
- `idx_user_id` on user_id
- `idx_status` on status
- `idx_category` on category
- `idx_created_at` on created_at
- `idx_status_category` composite index

## 📦 Sample Data

### schema.sql

Includes:
- **9 users** (6 students + 3 admins)
- **17 service requests** with various statuses

### additional_data.sql

Adds:
- **6 more users** (4 students + 2 admins)
- **10 more service requests**

**Total after both files:**
- 15 users
- 27 requests

## 🔐 Test Accounts

All sample accounts use password: `password123`

**Students:**
- john.doe@student.university.edu
- jane.smith@student.university.edu
- alice.wilson@student.university.edu
- bob.johnson@student.university.edu
- emily.davis@student.university.edu
- michael.brown@student.university.edu

**Admins:**
- admin@admin.university.edu
- sarah.admin@admin.university.edu
- tech.support@admin.university.edu

## 🔍 Useful Queries

### Get all pending requests

```sql
SELECT sr.*, u.full_name, u.email 
FROM service_requests sr
JOIN users u ON sr.user_id = u.id
WHERE sr.status = 'pending'
ORDER BY sr.created_at DESC;
```

### Get statistics by category

```sql
SELECT category, status, COUNT(*) as count
FROM service_requests
GROUP BY category, status
ORDER BY category, status;
```

### Get user's request history

```sql
SELECT * FROM service_requests
WHERE user_id = 1
ORDER BY created_at DESC;
```

### Get recently resolved requests

```sql
SELECT * FROM service_requests
WHERE status = 'resolved'
  AND resolved_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY resolved_at DESC;
```

## 🛠️ Maintenance

### Backup Database

```bash
mysqldump -u root -p scsrp > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
mysql -u root -p scsrp < backup_20260102.sql
```

### Reset Database

```bash
mysql -u root -p scsrp -e "DROP DATABASE scsrp; CREATE DATABASE scsrp;"
mysql -u root -p scsrp < schema.sql
```

## 📝 Notes

- All passwords in sample data are bcrypt hashed
- Foreign key constraints ensure data integrity
- Timestamps track creation, updates, and resolution
- Indexes optimize query performance
- CASCADE delete removes user's requests when user is deleted
