# Smart Campus Service Request Portal - Server

Backend API server for the Smart Campus Service Request Portal.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=scsrp
JWT_SECRET=your_secret_key
```

3. Set up database:
```bash
mysql -u root -p < ../database/schema.sql
```

### Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/
│   │   ├── authController.ts      # Authentication logic
│   │   ├── requestController.ts   # Student request logic
│   │   └── adminController.ts     # Admin operations
│   ├── middleware/
│   │   ├── authMiddleware.ts      # JWT authentication
│   │   └── uploadMiddleware.ts    # File upload handling
│   ├── routes/
│   │   ├── authRoutes.ts          # Auth endpoints
│   │   ├── requestRoutes.ts       # Student endpoints
│   │   └── adminRoutes.ts         # Admin endpoints
│   ├── models/
│   │   └── database.ts            # Database connection
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── utils/
│   │   └── jwt.ts                 # JWT utilities
│   └── server.ts                  # Main application
├── uploads/                       # File uploads directory
├── package.json
├── tsconfig.json
└── .env.example
```

## 🔌 API Endpoints

See [API_CONTRACT.md](../API_CONTRACT.md) for detailed API documentation.

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Service Requests (Student)
- `POST /api/requests` - Create new request
- `GET /api/requests` - Get user's requests
- `GET /api/requests/:id` - Get specific request

### Admin Operations
- `GET /api/admin/requests` - Get all requests
- `PUT /api/admin/requests/:id/status` - Update request status
- `PUT /api/admin/requests/:id/assign` - Assign request
- `PUT /api/admin/requests/:id/notes` - Add admin notes
- `GET /api/admin/statistics` - Get dashboard statistics

## 🧪 Testing

Test credentials from sample data:
- **Student**: `john.doe@student.university.edu` / `password123`
- **Admin**: `admin@admin.university.edu` / `password123`

## 🛠️ Technologies

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Password Hashing**: bcrypt

## 📝 Notes

- JWT tokens expire after 24 hours
- Max file upload size: 5MB
- Supported image formats: JPG, JPEG, PNG
- Email domains determine user roles automatically
