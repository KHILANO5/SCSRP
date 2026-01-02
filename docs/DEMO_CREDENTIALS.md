# 🎮 SCSRP Demo Mode - Test Without Backend!

## 🚀 Quick Start

You can now test the SCSRP frontend **without setting up the backend**! The application includes a demo mode with dummy data and mock credentials.

### How to Run

1. **Open the application:**
   ```bash
   cd /Users/pruthviraj/scfca1/SCSRP/client
   python3 -m http.server 8080
   ```

2. **Open in browser:**
   ```
   http://localhost:8080
   ```

3. **Login with demo credentials** (see below)

---

## 🔑 Demo Credentials

### Student Account

**Email:** `student@demo.com`  
**Password:** `demo123`

**Features you can test:**
- View service requests (3 pending, 3 in progress, 5 resolved)
- Create new service requests
- Filter requests by status
- View request details

---

### Admin Account

**Email:** `admin@demo.com`  
**Password:** `admin123`

**Features you can test:**
- View dashboard statistics
- See all campus requests (17 total)
- Filter by status and category
- Update request status
- Assign requests to departments
- Add admin notes
- View student information

---

## 📊 Demo Data Included

The demo mode includes **17 pre-loaded service requests**:

### By Status:
- **Pending**: 5 requests
- **In Progress**: 5 requests  
- **Resolved**: 7 requests

### By Category:
- 🏫 **Classroom**: 4 requests
- 🏠 **Hostel**: 3 requests
- 🔬 **Laboratory**: 3 requests
- 📚 **Library**: 3 requests
- 🏢 **Administrative**: 2 requests
- 📋 **Other**: 2 requests

### Sample Requests:
- Projector not working in Room 301 (Pending)
- Water leakage in Hostel Block B (In Progress)
- AC not working in Reading Hall (Pending)
- Computer Lab PCs not booting (Pending)
- WiFi connectivity issues (In Progress)
- Whiteboard markers needed (Resolved)
- And more...

---

## ✨ What You Can Do in Demo Mode

### As a Student:
✅ View all your service requests  
✅ Create new requests (they'll be added to demo data)  
✅ Filter by status (All, Pending, In Progress, Resolved)  
✅ Click on requests to view full details  
✅ See timestamps and status badges  

### As an Admin:
✅ View real-time statistics dashboard  
✅ See all campus requests from all students  
✅ Filter by status AND category  
✅ Update request status (Pending → In Progress → Resolved)  
✅ Assign requests to departments/personnel  
✅ Add admin notes to requests  
✅ View student information for each request  

---

## 🎯 Additional Test Accounts

You can also use these credentials (from the database schema):

### Student Accounts:
- **Email:** `john.doe@student.university.edu`  
  **Password:** `password123`

### Admin Accounts:
- **Email:** `admin@admin.university.edu`  
  **Password:** `password123`

---

## 🔄 Switching Between Demo and Real Backend

### Currently Using: **DEMO MODE** ✅

To switch to real backend:

1. Open `client/scripts/demo-data.js`
2. Change line 1:
   ```javascript
   const DEMO_MODE = false; // Set to false to use real API
   ```
3. Ensure your backend is running on `http://localhost:3000`

### To Switch Back to Demo Mode:

Set `DEMO_MODE = true` in `demo-data.js`

---

## 💡 Demo Mode Features

### What Works:
✅ **Login/Registration** - Mock authentication  
✅ **Create Requests** - Adds to demo data  
✅ **View Requests** - Shows demo data  
✅ **Filter/Search** - Works with demo data  
✅ **Update Status** - Modifies demo data  
✅ **Assign/Notes** - Updates demo data  
✅ **Statistics** - Calculates from demo data  
✅ **All UI Features** - Fully functional  

### What Doesn't Work:
❌ **Image Upload** - Files not saved (demo only)  
❌ **Data Persistence** - Resets on page refresh  
❌ **Real Database** - Uses in-memory data  

---

## 🎨 Testing Scenarios

### Scenario 1: Student Workflow
1. Login as `student@demo.com` / `demo123`
2. View your existing requests (11 total)
3. Click "New Request" button
4. Fill out the form:
   - Category: Classroom
   - Title: "Test Request"
   - Description: "This is a test"
5. Submit and see it appear in your list
6. Click on any request to view details

### Scenario 2: Admin Workflow
1. Login as `admin@demo.com` / `admin123`
2. View dashboard statistics
3. Filter requests by "Pending"
4. Click on a pending request
5. Click "Mark In Progress"
6. Add assignment: "IT Department"
7. Add notes: "Working on it"
8. Mark as "Resolved"

### Scenario 3: Create New Account
1. Click "Create Account"
2. Enter:
   - Name: "Test User"
   - Email: "test@demo.com"
   - Password: "test123"
3. Register successfully
4. Login with new credentials
5. Start creating requests

---

## 📝 Notes

- **Data is temporary**: All changes reset when you refresh the page
- **No backend needed**: Perfect for frontend testing and demos
- **Realistic data**: Includes timestamps, categories, statuses
- **Full functionality**: All features work except file uploads
- **Fast**: No network delays, instant responses

---

## 🚀 Ready to Use Real Backend?

When you're ready to connect to the actual backend:

1. Set up MySQL database (see `database/schema.sql`)
2. Start backend server on `http://localhost:3000`
3. Set `DEMO_MODE = false` in `demo-data.js`
4. Use the same credentials (they exist in the database)

---

## 🎉 Start Testing!

**Just open `index.html` in your browser and login with:**

👨‍🎓 **Student:** `student@demo.com` / `demo123`  
👨‍💼 **Admin:** `admin@demo.com` / `admin123`

**No backend setup required! 🎊**

---

**Happy Testing! 🚀**
