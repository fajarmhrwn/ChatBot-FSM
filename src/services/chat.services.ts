import { convFlow } from "../utils/const"
import * as sessionRepository from "../repositories/session.repo";
import Bot from "../utils/bot";

const bot = new Bot(convFlow)

/**
 * Memulai sesi percakapan baru.
 * @returns Objek berisi ID sesi dan respons awal.
 */
export async function startNewConversation() {
  const newSession = await sessionRepository.createSession('greetings');
  bot.state = 'greetings'
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
export async function getConversation(sessionId: string) {
  const currentSession = await sessionRepository.findSessionById(sessionId);
  if (!currentSession) throw new Error('Session not found');

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
export async function processUserResponse(sessionId: string, userInput: string): Promise<ResponseData | null> {
  const currentSession = await sessionRepository.findSessionById(sessionId);
  if (!currentSession) throw new Error('Session not found');

  bot.state = currentSession.currentState;
  const newResponse = bot.talk(userInput);
  const nextState = bot.state;

  const userMessage = { sender: 'user', text: userInput, timestamp: new Date() };
  const botMessage = { sender: 'bot', text: newResponse.messages[0], timestamp: new Date() };

  const collectedData = (currentSession.collectedData as string[]) || [];
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
export async function getChatHistory(sessionId: string): Promise<Message[] | null> {
  const session = await sessionRepository.findSessionById(sessionId);
  return session?.messages || null;
}

/**
 * Mengambil data yang terkumpul dari sebuah sesi.
 * @param sessionId - ID sesi yang akan dicari.
 * @returns Data yang terkumpul (bisa objek atau array) atau null.
 */
export async function getCollectedData(sessionId: string): Promise<Object | null> {
  const session = await sessionRepository.findSessionById(sessionId);
  return session?.collectedData || null;
}
