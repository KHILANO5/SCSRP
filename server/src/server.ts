import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes';
import requestRoutes from './routes/requestRoutes';
import adminRoutes from './routes/adminRoutes';
import pool from './models/database';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

// Health check endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Smart Campus Service Request Portal API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      requests: '/api/requests',
      admin: '/api/admin'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);

// Serve React app for all other routes (SPA support)
app.get('*', (req: Request, res: Response): void => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({
      success: false,
      error: 'API route not found'
    });
    return;
  }
  
  // In production, serve the built React app
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  } else {
    // In development, let Vite handle the frontend
    res.json({
      message: 'Frontend is running on Vite dev server',
      frontendUrl: 'http://localhost:5173',
      apiUrl: 'http://localhost:3000/api'
    });
  }
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Test database connection and start server
const startServer = async () => {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📝 API Documentation: http://localhost:${PORT}/api`);
      console.log(`🔐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  }
};

startServer();

export default app;
