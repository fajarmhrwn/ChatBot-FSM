import { Request, Response } from 'express';
import * as chatService from '../services/chat.services';
import { ApiResponse } from '../utils/response';

/**
 * Memulai sesi percakapan baru.
 */
export const startNewConversation = async (req: Request, res: Response) => {
  try {
    const sessionData = await chatService.startNewConversation();
    const responseData = {
      sessionId: sessionData.id,
      ...sessionData.initialResponse,
    };

    const response = new ApiResponse(true, 'Conversation started successfully', responseData);
    res.status(201).json(response);

  } catch (error) {
    console.error('Error starting conversation:', error);
    const response = new ApiResponse(false, 'Failed to start conversation');
    res.status(500).json(response);
  }
};

/**
 * Mendapatkan sesi percakapan.
 */
export const getConversation = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json(new ApiResponse(false, 'Session ID is required in the URL.'));
    }
    const currStep = await chatService.getConversation(sessionId);
    const responseData = {
      sessionId: currStep.id,
      ...currStep.response,
    }
    const response = new ApiResponse(true, 'Conversation started successfully', responseData);
    res.status(201).json(response);

  } catch (error) {
    console.error('Error getting conversation:', error);
    const response = new ApiResponse(false, 'Failed to get conversation');
    res.status(500).json(response);
  }
};


/**
 * Memproses input dari pengguna dan memajukan percakapan.
 */
export const handleUserResponse = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { userInput } = req.body;

    if (!sessionId) {
      return res.status(400).json(new ApiResponse(false, 'Session ID is required in the URL.'));
    }

    if (!userInput) {
      return res.status(400).json(new ApiResponse(false, 'User input is required.'));
    }

    const nextStep = await chatService.processUserResponse(sessionId, userInput);

    if (!nextStep) {
        return res.status(404).json(new ApiResponse(false, 'Session has ended or invalid input.'));
    }

    const response = new ApiResponse(true, 'Response processed successfully', nextStep);
    res.status(200).json(response);

  } catch (error) {
    console.error('Error handling user response:', error);
    const response = new ApiResponse(false, 'Failed to process user response');
    res.status(500).json(response);
  }
};

/**
 * Mengambil seluruh riwayat pesan dari sebuah sesi.
 */
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json(new ApiResponse(false, 'Session ID is required in the URL.'));
    }

    const history = await chatService.getChatHistory(sessionId);

    if (!history) {
        return res.status(404).json(new ApiResponse(false, 'Chat history not found for this session.'));
    }

    const response = new ApiResponse(true, 'History retrieved successfully', history);
    res.status(200).json(response);

  } catch (error) {
    console.error('Error retrieving chat history:', error);
    const response = new ApiResponse(false, 'Failed to retrieve chat history');
    res.status(500).json(response);
  }
};

/**
 * Mengambil data yang terkumpul dari sebuah sesi.
 */
export const getCollectedData = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json(new ApiResponse(false, 'Session ID is required in the URL.'));
    }

    const data = await chatService.getCollectedData(sessionId);

    if (data === null) {
      return res.status(404).json(new ApiResponse(false, 'Session not found or no data collected.'));
    }

    const response = new ApiResponse(true, 'Collected data retrieved successfully', data);
    res.status(200).json(response);

  } catch (error) {
    console.error('Error retrieving collected data:', error);
    const response = new ApiResponse(false, 'Failed to retrieve collected data');
    res.status(500).json(response);
  }
};
