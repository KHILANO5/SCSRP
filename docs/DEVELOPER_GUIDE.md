# SCSRP - Developer Guide

## 🏗️ System Architecture

The project follows a standard **Client-Server** architecture:

1.  **Frontend (Client)**:
    *   **Framework**: React 19 (SPA) run via Vite.
    *   **Communication**: Fetches data from Backend API over HTTP (REST).
    *   **State**: Uses React Context for Authentication (`AuthContext`).
    *   **Security**: Stores JWT in `localStorage` (for demo purposes) and sends it in the `Authorization` header.

2.  **Backend (Server)**:
    *   **Runtime**: Node.js with Express framework.
    *   **Language**: TypeScript (compiled to JS in `dist/`).
    *   **Database Interface**: `mysql2` library with connection pooling.
    *   **Auth**: Verifies JWT tokens via `authMiddleware`.

3.  **Database**:
    *   **MySQL**: Relational storage.
    *   **init**: Managed via `schema.sql` (structure) and `seed_data.sql` (data).

## 📂 Source Code Structure

### Server (`/server/src`)
*   `server.ts`: Entry point. Sets up Express app, middleware, and routes.
*   `config/`: (Optional) Env config loading.
*   `controllers/`: Logic for request handling.
    *   `authController.ts`: Login/Register logic.
    *   `requestController.ts`: Student CRUD operations.
    *   `adminController.ts`: Admin operations.
*   `middleware/`:
    *   `authMiddleware.ts`: Checks `Bearer <token>` and `req.user.role`.
    *   `uploadMiddleware.ts`: Multer config for image uploads.
*   `models/`:
    *   `database.ts`: Exports the MySQL Connection Pool.
*   `routes/`: Express routers mapping URLs to controllers.
*   `types/`: TypeScript interfaces (`User`, `ServiceRequest`, `RequestWithUser`).
*   `utils/`: Helper functions (JWT generation).

### Client (`/client/src`)
*   `App.jsx`: Main Router setup (Routes: `/`, `/auth`, `/dashboard`).
*   `context/AuthContext.jsx`: Handles Login/Logout state and token persistence.
*   `lib/api.js`: Wrapper around `fetch`. Handles headers and error parsing automatically.
*   `pages/`:
    *   `Landing.jsx`: Home page.
    *   `Auth.jsx`: Login/Register forms.
    *   `StudentDashboard.jsx`: View for students.
    *   `AdminDashboard.jsx`: View for admins.
*   `components/`: Reusable UI elements (Buttons, RequestCard, Modal).

## 🛠️ Setup & Development

### 1. Environment Variables
**Server (`server/.env`):**
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=scsrp
JWT_SECRET=your_secret_key
```

### 2. Running Locally

**Terminal 1 (Backend):**
```bash
cd server
npm install
npm run dev
# Runs nodemon on localhost:3000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
npm run dev
# Runs Vite on localhost:5173
```

### 3. Database Reset
If you need to wipe the data and start fresh:
```bash
mysql -u root -p scsrp < database/schema.sql
mysql -u root -p scsrp < database/seed_data.sql
```

## 🧪 Testing

*   **API Testing**: Use the `docs/API_CONTRACT.md` to configure Postman.
*   **Credentials**:
    *   Student: `john.doe@student.university.edu` / `password123`
    *   Admin: `admin@admin.university.edu` / `password123`
