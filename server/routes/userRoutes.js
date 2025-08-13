import express from 'express';
import { clerkWebHooks } from '../controllers/UserController.js';

const router = express.Router();

// Clerk Webhook route
router.post('/webhooks', clerkWebHooks);
export default router;