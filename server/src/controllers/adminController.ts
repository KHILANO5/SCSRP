import { Response } from 'express';
import pool from '../models/database';
import { RequestWithUser } from '../types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getAllRequests = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const { status, category, student_email } = req.query;

    let query = `
      SELECT 
        sr.*,
        u.full_name as student_name,
        u.email as student_email
      FROM service_requests sr
      JOIN users u ON sr.user_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      query += ' AND sr.status = ?';
      params.push(status);
    }

    if (category) {
      query += ' AND sr.category = ?';
      params.push(category);
    }

    if (student_email) {
      query += ' AND u.email = ?';
      params.push(student_email);
    }

    query += ' ORDER BY sr.created_at DESC';

    const [requests] = await pool.query<RowDataPacket[]>(query, params);

    res.status(200).json({
      success: true,
      requests
    });
  } catch (error) {
    console.error('Get all requests error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateRequestStatus = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'in_progress', 'resolved'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
      return;
    }

    // Check if request exists
    const [requests] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM service_requests WHERE id = ?',
      [id]
    );

    if (requests.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Request not found'
      });
      return;
    }

    // Update status and resolved_at if status is resolved
    let query = 'UPDATE service_requests SET status = ?';
    const params: any[] = [status];

    if (status === 'resolved') {
      query += ', resolved_at = NOW()';
    }

    query += ' WHERE id = ?';
    params.push(id);

    await pool.query<ResultSetHeader>(query, params);

    res.status(200).json({
      success: true,
      message: 'Request status updated successfully'
    });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const assignRequest = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;

    if (!assigned_to) {
      res.status(400).json({
        success: false,
        error: 'assigned_to is required'
      });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE service_requests SET assigned_to = ? WHERE id = ?',
      [assigned_to, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        error: 'Request not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Request assigned successfully'
    });
  } catch (error) {
    console.error('Assign request error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const addAdminNotes = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { admin_notes } = req.body;

    if (!admin_notes) {
      res.status(400).json({
        success: false,
        error: 'admin_notes is required'
      });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE service_requests SET admin_notes = ? WHERE id = ?',
      [admin_notes, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        error: 'Request not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Notes added successfully'
    });
  } catch (error) {
    console.error('Add admin notes error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getStatistics = async (_req: RequestWithUser, res: Response): Promise<void> => {
  try {
    // Total requests
    const [totalResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM service_requests'
    );

    // Requests by status
    const [statusResult] = await pool.query<RowDataPacket[]>(
      'SELECT status, COUNT(*) as count FROM service_requests GROUP BY status'
    );

    // Requests by category
    const [categoryResult] = await pool.query<RowDataPacket[]>(
      'SELECT category, COUNT(*) as count FROM service_requests GROUP BY category'
    );

    // Average resolution time
    const [avgTimeResult] = await pool.query<RowDataPacket[]>(
      `SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, resolved_at)) as avg_hours 
       FROM service_requests 
       WHERE resolved_at IS NOT NULL`
    );

    // Resolved today
    const [resolvedTodayResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM service_requests WHERE DATE(resolved_at) = CURDATE()'
    );

    const statistics: any = {
      total_requests: totalResult[0].total,
      pending: 0,
      in_progress: 0,
      resolved: 0,
      by_category: {} as Record<string, number>,
      avg_resolution_time_hours: parseFloat(avgTimeResult[0].avg_hours || 0).toFixed(1),
      resolved_today: resolvedTodayResult[0].count
    };

    statusResult.forEach((row: any) => {
      statistics[row.status] = row.count;
    });

    categoryResult.forEach((row: any) => {
      statistics.by_category[row.category] = row.count;
    });

    res.status(200).json({
      success: true,
      statistics
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
