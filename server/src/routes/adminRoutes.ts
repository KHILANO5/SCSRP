import { Router } from 'express';
import {
  getAllRequests,
  updateRequestStatus,
  assignRequest,
  addAdminNotes,
  getStatistics
} from '../controllers/adminController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/requests', getAllRequests);
router.put('/requests/:id/status', updateRequestStatus);
router.put('/requests/:id/assign', assignRequest);
router.put('/requests/:id/notes', addAdminNotes);
router.get('/statistics', getStatistics);

export default router;
