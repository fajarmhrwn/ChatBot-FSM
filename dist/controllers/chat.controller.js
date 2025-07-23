"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectedData = exports.getChatHistory = exports.handleUserResponse = exports.getConversation = exports.startNewConversation = void 0;
const chatService = __importStar(require("../services/chat.services"));
const response_1 = require("../utils/response");
/**
 * Memulai sesi percakapan baru.
 */
const startNewConversation = async (req, res) => {
    try {
        const sessionData = await chatService.startNewConversation();
        const responseData = {
            sessionId: sessionData.id,
            ...sessionData.initialResponse,
        };
        const response = new response_1.ApiResponse(true, 'Conversation started successfully', responseData);
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error starting conversation:', error);
        const response = new response_1.ApiResponse(false, 'Failed to start conversation');
        res.status(500).json(response);
    }
};
exports.startNewConversation = startNewConversation;
/**
 * Mendapatkan sesi percakapan.
 */
const getConversation = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) {
            return res.status(400).json(new response_1.ApiResponse(false, 'Session ID is required in the URL.'));
        }
        const currStep = await chatService.getConversation(sessionId);
        const responseData = {
            sessionId: currStep.id,
            ...currStep.response,
        };
        const response = new response_1.ApiResponse(true, 'Conversation started successfully', responseData);
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error getting conversation:', error);
        const response = new response_1.ApiResponse(false, 'Failed to get conversation');
        res.status(500).json(response);
    }
};
exports.getConversation = getConversation;
/**
 * Memproses input dari pengguna dan memajukan percakapan.
 */
const handleUserResponse = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { userInput } = req.body;
        if (!sessionId) {
            return res.status(400).json(new response_1.ApiResponse(false, 'Session ID is required in the URL.'));
        }
        if (!userInput) {
            return res.status(400).json(new response_1.ApiResponse(false, 'User input is required.'));
        }
        const nextStep = await chatService.processUserResponse(sessionId, userInput);
        if (!nextStep) {
            return res.status(404).json(new response_1.ApiResponse(false, 'Session has ended or invalid input.'));
        }
        const response = new response_1.ApiResponse(true, 'Response processed successfully', nextStep);
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error handling user response:', error);
        const response = new response_1.ApiResponse(false, 'Failed to process user response');
        res.status(500).json(response);
    }
};
exports.handleUserResponse = handleUserResponse;
/**
 * Mengambil seluruh riwayat pesan dari sebuah sesi.
 */
const getChatHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) {
            return res.status(400).json(new response_1.ApiResponse(false, 'Session ID is required in the URL.'));
        }
        const history = await chatService.getChatHistory(sessionId);
        if (!history) {
            return res.status(404).json(new response_1.ApiResponse(false, 'Chat history not found for this session.'));
        }
        const response = new response_1.ApiResponse(true, 'History retrieved successfully', history);
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error retrieving chat history:', error);
        const response = new response_1.ApiResponse(false, 'Failed to retrieve chat history');
        res.status(500).json(response);
    }
};
exports.getChatHistory = getChatHistory;
/**
 * Mengambil data yang terkumpul dari sebuah sesi.
 */
const getCollectedData = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) {
            return res.status(400).json(new response_1.ApiResponse(false, 'Session ID is required in the URL.'));
        }
        const data = await chatService.getCollectedData(sessionId);
        if (data === null) {
            return res.status(404).json(new response_1.ApiResponse(false, 'Session not found or no data collected.'));
        }
        const response = new response_1.ApiResponse(true, 'Collected data retrieved successfully', data);
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error retrieving collected data:', error);
        const response = new response_1.ApiResponse(false, 'Failed to retrieve collected data');
        res.status(500).json(response);
    }
};
exports.getCollectedData = getCollectedData;
//# sourceMappingURL=chat.controller.js.map