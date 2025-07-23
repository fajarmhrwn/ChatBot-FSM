"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const router = (0, express_1.Router)();
// POST /api/chat/start
router.post('/start', chat_controller_1.startNewConversation);
// POST /api/chat/:id/respond
router.post('/:sessionId/respond', chat_controller_1.handleUserResponse);
// GET /api/chat/:id/history
router.get('/:sessionId/history', chat_controller_1.getChatHistory);
// GET /api/chat/:id/bot
router.get('/:sessionId/bot', chat_controller_1.getConversation);
// GET /api/chat/:id/data
router.get('/:sessionId/data', chat_controller_1.getCollectedData);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map