import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { RequestWithUser } from '../types';

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        error: 'No token provided'
      });
      return;
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'No token provided'
      });
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

export const adminMiddleware = (req: RequestWithUser, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({
      success: false,
      error: 'Access denied. Admin only.'
    });
    return;
  }
  next();
};
