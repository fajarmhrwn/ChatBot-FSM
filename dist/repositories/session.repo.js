"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.findSessionById = findSessionById;
exports.updateSession = updateSession;
const client_1 = require("../utils/client");
/**
 * Membuat sesi baru di database.
 * @param initialState - State awal untuk FSM, misalnya "greetings".
 * @returns Objek Session yang baru dibuat.
 */
async function createSession(initialState) {
    return client_1.prisma.session.create({
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
async function findSessionById(id) {
    return client_1.prisma.session.findUnique({
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
async function updateSession(id, data) {
    return client_1.prisma.session.update({
        where: {
            id: id,
        },
        data: data,
    });
}
//# sourceMappingURL=session.repo.js.map