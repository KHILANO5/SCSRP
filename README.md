# 🏫 SCSRP - Smart Campus Service Request Portal

A modern, premium full-stack web application designed to streamline facility management on campus. It provides a seamless interface for students to report issues and for administrators to manage, track, and resolve them efficiently.

![SCSRP Dashboard](https://via.placeholder.com/800x400?text=SCSRP+Dashboard+Preview)

## ✨ Features

### 👨‍🎓 For Students
- **Create Requests**: Easily report issues like broken equipment, plumbing, or electrical problems with image uploads.
- **Real-time Tracking**: Monitor the status of requests (Pending → In Progress → Resolved).
- **Dashboard**: View a history of all submitted requests with detailed status updates.
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices.

### 👨‍💼 For Administrators
- **Centralized Dashboard**: specific entry point to view all campus service requests.
- **Statistics Overview**: Real-time stats on pending, in-progress, and resolved requests.
- **Request Management**: Update statuses, assign tasks to departments, and add internal notes.
- **Advanced Filtering**: Filter requests by category (Classroom, Hostel, Lab, etc.) and status.

## 🛠️ Technology Stack

**Frontend**
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS (Modern, Responsive, Dark Mode support)
- **State Management**: React Context API
- **Routing**: React Router v7

**Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (TypeScript)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt
- **File Handling**: Multer (for image uploads)

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **Git**

### 1️⃣ Database Setup
1.  Open your MySQL client (CLI or Workbench).
2.  Create the database and tables using the provided schema:
    ```bash
    mysql -u root -p < database/schema.sql
    ```
    *This will create the `scsrp` database and seed it with sample data.*

### 2️⃣ Backend Setup (Server)
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    - Create a `.env` file in the `server` directory (copy from `.env.example` if available).
    - Add your database credentials:
      ```env
      PORT=3000
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=your_password  # <--- Update this to your MySQL password
      DB_NAME=scsrp
      JWT_SECRET=supersecretkey123
      ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    *The server runs on `http://localhost:3000`.*

### 3️⃣ Frontend Setup (Client)
1.  Navigate to the client directory:
    ```bash
    cd ../client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the browser at the URL shown (usually `http://localhost:5173`).

## 🔐 Login Credentials

The project comes with pre-loaded users for testing:

| Role | Email | Password |
|------|-------|----------|
| **Student** | `john.doe@student.university.edu` | `password123` |
| **Admin** | `admin@admin.university.edu` | `password123` |

*(Additional sample users can be found in `database/schema.sql`)*

## 📂 Project Structure

```
SCSRP/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page views (Dashboard, Login, etc.)
│   │   ├── context/        # Auth context
│   │   └── lib/            # API utilities
│   └── index.html
├── server/                 # Express Backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API endpoints
│   │   └── models/         # Database queries
│   └── uploads/            # Stored user-uploaded images
├── database/
│   └── schema.sql          # Database structure & seed data
└── README.md
```

## 🔌 API Documentation

The backend exposes a RESTful API. Key endpoints include:

-   `POST /api/auth/login` - User login
-   `GET /api/requests` - Fetch student requests
-   `POST /api/requests` - Create a new service request
-   `GET /api/admin/requests` - Fetch all requests (Admin)
-   `PUT /api/admin/requests/:id/status` - Update request status

## 🤝 Contributing
This is an educational project. Contributions are welcome!
1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---
Built with ❤️ for the Smart Campus initiative.