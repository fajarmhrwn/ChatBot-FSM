import { Router } from 'express';
import {
  startNewConversation,
  handleUserResponse,
  getChatHistory,
  getConversation,
  getCollectedData
} from '../controllers/chat.controller';


const router = Router();


// POST /api/chat/start
router.post('/start', startNewConversation);

// POST /api/chat/:id/respond
router.post('/:sessionId/respond', handleUserResponse);

// GET /api/chat/:id/history
router.get('/:sessionId/history', getChatHistory);

// GET /api/chat/:id/bot
router.get('/:sessionId/bot', getConversation);

// GET /api/chat/:id/data
router.get('/:sessionId/data', getCollectedData);
export default router;
