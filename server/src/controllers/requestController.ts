import { Response } from 'express';
import pool from '../models/database';
import { RequestWithUser } from '../types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const createRequest = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const { category, title, description } = req.body;
    const userId = req.user?.id;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate required fields
    if (!category || !title || !description) {
      res.status(400).json({
        success: false,
        error: 'Category, title, and description are required'
      });
      return;
    }

    // Validate category
    const validCategories = ['classroom', 'hostel', 'laboratory', 'library', 'administrative', 'other'];
    if (!validCategories.includes(category)) {
      res.status(400).json({
        success: false,
        error: 'Invalid category'
      });
      return;
    }

    // Insert service request
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO service_requests (user_id, category, title, description, image_path) VALUES (?, ?, ?, ?, ?)',
      [userId, category, title, description, imagePath]
    );

    res.status(201).json({
      success: true,
      message: 'Request created successfully',
      requestId: result.insertId
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getUserRequests = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { status } = req.query;

    let query = 'SELECT * FROM service_requests WHERE user_id = ?';
    const params: any[] = [userId];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const [requests] = await pool.query<RowDataPacket[]>(query, params);

    res.status(200).json({
      success: true,
      requests
    });
  } catch (error) {
    console.error('Get user requests error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getRequestById = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const [requests] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM service_requests WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (requests.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Request not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      request: requests[0]
    });
  } catch (error) {
    console.error('Get request error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
