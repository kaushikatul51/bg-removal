import express from 'express';
import { clerkWebHooks, userCredits } from '../controllers/UserController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Clerk Webhook route
router.post('/webhooks', clerkWebHooks);
router.get('/credits',auth,userCredits)
export default router;