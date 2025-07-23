"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = app.listen(3000, () => console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`));
//# sourceMappingURL=index.js.map