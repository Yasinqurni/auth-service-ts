import { Request } from 'express';
 
export interface AuthenticatedRequest extends Request {
    id?: string
    username?: string
    email?: string
    role?: string
  }