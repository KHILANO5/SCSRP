# API Contract Documentation

## Base URL
```
http://localhost:3000/api
```

---

## Authentication Endpoints

### 1. Register User
**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "student@student.university.edu",
  "password": "password123",
  "full_name": "John Doe"
}
```

> **Note on Role Assignment**:
> The backend automatically assigns roles based on the email domain:
> - Ends with `@student.university.edu` → Assigned **"student"** role
> - Ends with `@admin.university.edu` → Assigned **"admin"** role
> - Any other domain → Return 400 Error ("Invalid email domain")

**Success Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": 1
}
```

**Error Response** (400/409):
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

### 2. Login User
**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "student@example.edu",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "student@example.edu",
    "full_name": "John Doe",
    "role": "student"
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

## Service Request Endpoints (Student)

### 3. Create Service Request
**Endpoint**: `POST /requests`

**Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body** (multipart/form-data):
```
category: "classroom"
title: "Projector not working"
description: "The projector in room 301 is broken"
image: [File] (optional)
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Request created successfully",
  "requestId": 1
}
```

---

### 4. Get User's Requests
**Endpoint**: `GET /requests`

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Query Parameters** (optional):
```
status: "pending" | "in_progress" | "resolved"
```

**Success Response** (200):
```json
{
  "success": true,
  "requests": [
    {
      "id": 1,
      "category": "classroom",
      "title": "Projector not working",
      "description": "The projector in room 301 is broken",
      "image_path": "/uploads/image123.jpg",
      "status": "pending",
      "admin_notes": null,
      "assigned_to": null,
      "created_at": "2026-01-02T10:30:00Z",
      "updated_at": "2026-01-02T10:30:00Z",
      "resolved_at": null
    }
  ]
}
```

---

### 5. Get Single Request
**Endpoint**: `GET /requests/:id`

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Success Response** (200):
```json
{
  "success": true,
  "request": {
    "id": 1,
    "category": "classroom",
    "title": "Projector not working",
    "description": "The projector in room 301 is broken",
    "image_path": "/uploads/image123.jpg",
    "status": "pending",
    "admin_notes": null,
    "assigned_to": null,
    "created_at": "2026-01-02T10:30:00Z",
    "updated_at": "2026-01-02T10:30:00Z",
    "resolved_at": null
  }
}
```

---

## Admin Endpoints

### 6. Get All Requests (Admin)
**Endpoint**: `GET /admin/requests`

**Headers**:
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters** (optional):
```
status: "pending" | "in_progress" | "resolved"
category: "classroom" | "hostel" | "laboratory" | "library" | "administrative" | "other"
student_email: "john@example.edu"
```

**Success Response** (200):
```json
{
  "success": true,
  "requests": [
    {
      "id": 1,
      "user_id": 5,
      "student_name": "John Doe",
      "student_email": "john@example.edu",
      "category": "classroom",
      "title": "Projector not working",
      "description": "The projector in room 301 is broken",
      "image_path": "/uploads/image123.jpg",
      "status": "pending",
      "admin_notes": null,
      "assigned_to": null,
      "created_at": "2026-01-02T10:30:00Z",
      "updated_at": "2026-01-02T10:30:00Z",
      "resolved_at": null
    }
  ]
}
```

---

### 7. Update Request Status (Admin)
**Endpoint**: `PUT /admin/requests/:id/status`

**Headers**:
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "status": "in_progress"  // or "resolved"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Request status updated successfully"
}
```

---

### 8. Assign Request (Admin)
**Endpoint**: `PUT /admin/requests/:id/assign`

**Headers**:
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "assigned_to": "IT Department"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Request assigned successfully"
}
```

---

### 9. Add Admin Notes (Admin)
**Endpoint**: `PUT /admin/requests/:id/notes`

**Headers**:
```
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "admin_notes": "Technician dispatched to fix the issue"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Notes added successfully"
}
```

---

### 10. Get Dashboard Statistics (Admin)
**Endpoint**: `GET /admin/statistics`

**Headers**:
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response** (200):
```json
{
  "success": true,
  "statistics": {
    "total_requests": 17,
    "pending": 5,
    "in_progress": 5,
    "resolved": 7,
    "by_category": {
      "classroom": 4,
      "hostel": 3,
      "laboratory": 3,
      "library": 3,
      "administrative": 2,
      "other": 2
    },
    "avg_resolution_time_hours": 48.5,
    "resolved_today": 2
  }
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "error": "No token provided" 
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Request not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## JWT Token Structure

**Payload**:
```json
{
  "id": 1,
  "email": "student@example.edu",
  "role": "student",
  "iat": 1609459200,
  "exp": 1609545600
}
```

**Token Expiration**: 24 hours

**Usage**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

---

## Request Categories

- `classroom` - Classroom-related issues
- `hostel` - Hostel/dormitory issues
- `laboratory` - Lab equipment issues
- `library` - Library-related issues
- `administrative` - Admin office issues
- `other` - Other campus issues

---

## Request Status Flow

```
pending → in_progress → resolved
```

Only admins can change status.

---

## File Upload

- **Max file size**: 5 MB
- **Allowed types**: JPG, JPEG, PNG
- **Upload endpoint**: Part of `POST /requests`
- **File storage**: `/server/uploads/`
- **Access**: Files served statically at `/uploads/<filename>`

---

## Notes for Frontend Team

1. Store JWT token in `localStorage` after login
2. Include token in `Authorization` header for all protected routes
3. Redirect to login if token is invalid/expired
4. Parse JWT to get user role for UI rendering
5. Use FormData for image uploads

## Notes for Backend Team

1. Verify JWT on all protected routes
2. Check user role for admin-only endpoints
3. Validate all inputs before database operations
4. Use parameterized queries to prevent SQL injection
5. Hash passwords with bcrypt (10 salt rounds)
6. Set `resolved_at` timestamp when status changes to "resolved"

---

**Version**: 1.0  
**Last Updated**: January 2, 2026
