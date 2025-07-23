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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNewConversation = startNewConversation;
exports.getConversation = getConversation;
exports.processUserResponse = processUserResponse;
exports.getChatHistory = getChatHistory;
exports.getCollectedData = getCollectedData;
const const_1 = require("../utils/const");
const sessionRepository = __importStar(require("../repositories/session.repo"));
const bot_1 = __importDefault(require("../utils/bot"));
const bot = new bot_1.default(const_1.convFlow);
/**
 * Memulai sesi percakapan baru.
 * @returns Objek berisi ID sesi dan respons awal.
 */
async function startNewConversation() {
    const newSession = await sessionRepository.createSession('greetings');
    bot.state = 'greetings';
    const initialResponse = bot.getResponse();
    const finalSession = await sessionRepository.updateSession(newSession.id, {
        messages: {
            create: [
                {
                    sender: 'bot',
                    text: initialResponse.messages[0],
                    timestamp: new Date()
                }
            ]
        }
    });
    return {
        id: finalSession.id,
        initialResponse
    };
}
/**
 * Mendapatkan  sesi percakapan baru.
 * @returns Objek berisi ID sesi dan respons terakhir.
 */
async function getConversation(sessionId) {
    const currentSession = await sessionRepository.findSessionById(sessionId);
    if (!currentSession)
        throw new Error('Session not found');
    bot.state = currentSession.currentState;
    const response = bot.getResponse();
    return {
        id: currentSession.id,
        response
    };
}
/**
 * Memproses input pengguna dan menentukan langkah selanjutnya.
 * @param sessionId - ID sesi.
 * @param userInput - Pilihan atau input dari pengguna.
 * @returns Respons bot berikutnya (pesan dan tombol).
 */
async function processUserResponse(sessionId, userInput) {
    const currentSession = await sessionRepository.findSessionById(sessionId);
    if (!currentSession)
        throw new Error('Session not found');
    bot.state = currentSession.currentState;
    const newResponse = bot.talk(userInput);
    const nextState = bot.state;
    const userMessage = { sender: 'user', text: userInput, timestamp: new Date() };
    const botMessage = { sender: 'bot', text: newResponse.messages[0], timestamp: new Date() };
    const collectedData = currentSession.collectedData || [];
    collectedData.push(userInput);
    await sessionRepository.updateSession(sessionId, {
        currentState: nextState,
        collectedData: collectedData,
        messages: {
            create: [
                { sender: 'user', text: userInput },
                { sender: 'bot', text: botMessage.text }
            ],
        },
    });
    return newResponse;
}
/**
 * Mengambil riwayat pesan untuk sebuah sesi.
 * @param sessionId - ID sesi
 * @return Riwayat Percakapan.
 */
async function getChatHistory(sessionId) {
    const session = await sessionRepository.findSessionById(sessionId);
    return session?.messages || null;
}
/**
 * Mengambil data yang terkumpul dari sebuah sesi.
 * @param sessionId - ID sesi yang akan dicari.
 * @returns Data yang terkumpul (bisa objek atau array) atau null.
 */
async function getCollectedData(sessionId) {
    const session = await sessionRepository.findSessionById(sessionId);
    return session?.collectedData || null;
}
//# sourceMappingURL=chat.services.js.map