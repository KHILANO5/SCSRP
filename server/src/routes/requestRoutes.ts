import { Router } from 'express';
import { createRequest, getUserRequests, getRequestById } from '../controllers/requestController';
import { authMiddleware } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/', upload.single('image'), createRequest);
router.get('/', getUserRequests);
router.get('/:id', getRequestById);

export default router;
