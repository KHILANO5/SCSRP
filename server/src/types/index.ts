import { Request } from 'express';

export interface User {
  id: number;
  email: string;
  password: string;
  full_name: string;
  role: 'student' | 'admin';
  created_at: Date;
}

export interface ServiceRequest {
  id: number;
  user_id: number;
  category: 'classroom' | 'hostel' | 'laboratory' | 'library' | 'administrative' | 'other';
  title: string;
  description: string;
  image_path: string | null;
  status: 'pending' | 'in_progress' | 'resolved';
  admin_notes: string | null;
  assigned_to: string | null;
  created_at: Date;
  updated_at: Date;
  resolved_at: Date | null;
}

export interface JWTPayload {
  id: number;
  email: string;
  role: 'student' | 'admin';
}

export interface RequestWithUser extends Request {
  user?: JWTPayload;
}
