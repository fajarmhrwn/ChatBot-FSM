import { prisma } from '../utils/client';
import { Session, Prisma } from '@prisma/client';

/**
 * Membuat sesi baru di database.
 * @param initialState - State awal untuk FSM, misalnya "greetings".
 * @returns Objek Session yang baru dibuat.
 */
export async function createSession(initialState: string): Promise<Session> {
  return prisma.session.create({
      data: {
        currentState: initialState,
        collectedData: [],
      },
    });
}

/**
 * Mencari satu sesi berdasarkan ID uniknya.
 * @param id - ID dari sesi yang akan dicari.
 * @returns Objek Session jika ditemukan, atau null jika tidak.
 */
export async function findSessionById(id: string): Promise<Session & { messages: Message[] } | null> {
  return prisma.session.findUnique({
      where: {
        id: id,
      },
      include: {
        messages: true,
      },
    });
}

/**
 * Memperbarui data sebuah sesi yang sudah ada.
 * @param id - ID dari sesi yang akan diperbarui.
 * @param data - Data yang akan diubah. Bisa berupa sebagian data (Partial).
 * @returns Objek Session yang sudah diperbarui.
 */
export async function updateSession(
  id: string,
  data: Prisma.SessionUpdateInput
): Promise<Session> {
  return prisma.session.update({
    where: {
      id: id,
    },
    data: data,
  });
}

