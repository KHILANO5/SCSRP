# SCSRP Frontend - Smart Campus Service Request Portal

## 🎨 Overview

A modern, premium frontend application for the Smart Campus Service Request Portal. Built with vanilla HTML, CSS, and JavaScript featuring:

- ✨ **Premium Design**: Dark mode with glassmorphism, vibrant gradients, and smooth animations
- 🎯 **Dual Dashboards**: Separate interfaces for students and administrators
- 🔐 **Authentication**: Secure login and registration system
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight**: No heavy frameworks, pure vanilla JavaScript

## 📂 Project Structure

```
client/
├── index.html              # Main HTML file with all pages and modals
├── styles/
│   └── main.css           # Complete design system and styles
├── scripts/
│   └── app.js             # Application logic and API integration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Backend API running on `http://localhost:3000` (see main README)

### Running the Frontend

#### Option 1: Using Python (Recommended)

```bash
cd client
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

#### Option 2: Using Node.js

```bash
cd client
npx serve
```

#### Option 3: Using VS Code Live Server

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 4: Direct File Access

Simply open `index.html` in your browser (note: some features may not work due to CORS)

## 🎯 Features

### 🏠 Home / Landing Page
- Modern hero section with animated visuals
- Feature highlights (Easy Reporting, Real-time Tracking, Quick Resolution)
- Clear Call-to-Actions for Login and Registration
- Responsive navigation bar with role-agnostic entry points

### For Students

- **Create Requests**: Submit service requests with images
- **Track Status**: Monitor request progress (Pending → In Progress → Resolved)
- **Filter Requests**: View all, pending, in-progress, or resolved requests
- **Request Details**: View complete information about each request

### For Administrators

- **Dashboard Statistics**: Real-time overview of all requests
- **Manage Requests**: View and filter all campus service requests
- **Update Status**: Change request status (pending/in-progress/resolved)
- **Assign Tasks**: Assign requests to departments or personnel
- **Add Notes**: Provide updates and comments on requests
- **Advanced Filtering**: Filter by status and category

## 🎨 Design System

### Color Palette

- **Primary**: HSL-based purple gradient (250° hue)
- **Status Colors**:
  - Pending: Orange (#F59E0B)
  - In Progress: Blue (#3B82F6)
  - Resolved: Green (#10B981)
- **Dark Mode**: Modern dark theme with subtle gradients

### Typography

- **Primary Font**: Inter (body text)
- **Display Font**: Outfit (headings)

### Key Design Elements

- Glassmorphism effects with backdrop blur
- Smooth micro-animations on hover
- Gradient orbs for visual interest
- Card-based layouts with elevation
- Responsive grid systems

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:3000/api`. Update the `API_BASE_URL` in `scripts/app.js` if your backend runs on a different port.

### Authentication

- JWT tokens stored in `localStorage`
- Automatic token inclusion in API requests
- Auto-redirect to login on token expiration

### Endpoints Used

**Authentication:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

**Student:**
- `GET /requests` - Get user's requests
- `POST /requests` - Create new request
- `GET /requests/:id` - Get request details

**Admin:**
- `GET /admin/requests` - Get all requests
- `GET /admin/statistics` - Get dashboard stats
- `PUT /admin/requests/:id/status` - Update status
- `PUT /admin/requests/:id/assign` - Assign request
- `PUT /admin/requests/:id/notes` - Add notes

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (full layout)
- **Tablet**: 481px - 768px (adjusted grid)
- **Mobile**: ≤ 480px (single column)

## 🎭 User Roles

### Student Account

- Email must end with `@student.university.edu`
- Can create and track their own requests
- Cannot access admin features

### Admin Account

- Email must end with `@admin.university.edu`
- Full access to all requests
- Can manage, assign, and resolve requests
- Access to statistics dashboard

### Test Credentials

**Student:**
- Email: `john.doe@student.university.edu`
- Password: `password123`

**Admin:**
- Email: `admin@admin.university.edu`
- Password: `password123`

## 🛠️ Customization

### Changing Colors

Edit CSS variables in `styles/main.css`:

```css
:root {
    --primary-hue: 250;        /* Change primary color hue */
    --primary-sat: 85%;        /* Saturation */
    --primary-light: 58%;      /* Lightness */
}
```

### Changing API URL

Edit `scripts/app.js`:

```javascript
const API_BASE_URL = 'http://your-api-url.com/api';
```

### Adding Categories

Update the category lists in:
1. `index.html` - Form select options
2. `scripts/app.js` - `getCategoryIcon()` function

## 🐛 Troubleshooting

### "Failed to fetch" errors

- Ensure backend is running on `http://localhost:3000`
- Check browser console for CORS errors
- Verify API_BASE_URL is correct

### Images not loading

- Check that backend serves static files from `/uploads`
- Verify image paths in API responses



### Authentication issues

- Clear localStorage: `localStorage.clear()`
- Check token validity in browser DevTools
- Ensure backend JWT secret matches

## 📦 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported

## 🎯 Performance

- **First Load**: < 1s (on fast connection)
- **Page Size**: ~50KB (HTML + CSS + JS)
- **No Dependencies**: Zero external JavaScript libraries
- **Optimized**: CSS animations use GPU acceleration

## 🔒 Security Notes

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- No sensitive data in client-side code
- HTTPS recommended for production
- Input validation on both client and server

## 📝 Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] Push notifications
- [ ] Advanced search and filtering
- [ ] Export requests to PDF/CSV
- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Accessibility improvements (ARIA labels)

## 🤝 Contributing

This is a hackathon project. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

Created for educational purposes - Hackathon Project 2026

---

**Built with ❤️ for Smart Campus Management**
