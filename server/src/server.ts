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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
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
