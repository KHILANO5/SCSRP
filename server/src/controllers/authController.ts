import { Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../models/database';
import { generateToken } from '../utils/jwt';
import { RequestWithUser, User } from '../types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const register = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const { email, password, full_name } = req.body;

    // Validate required fields
    if (!email || !password || !full_name) {
      res.status(400).json({
        success: false,
        error: 'Email, password, and full name are required'
      });
      return;
    }

    // Determine role based on email domain
    let role: 'student' | 'admin';
    if (email.endsWith('@student.university.edu')) {
      role = 'student';
    } else if (email.endsWith('@admin.university.edu')) {
      role = 'admin';
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid email domain'
      });
      return;
    }

    // Check if user already exists
    const [existingUsers] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      res.status(409).json({
        success: false,
        error: 'Email already exists'
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (email, password, full_name, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, full_name, role]
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const login = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
      return;
    }

    // Find user
    const [users] = await pool.query<RowDataPacket[]>(
      'SELECT id, email, password, full_name, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
      return;
    }

    const user = users[0] as User;

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
      return;
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
