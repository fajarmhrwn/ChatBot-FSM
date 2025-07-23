"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./utils/swagger_output.json"));
// Create Express server
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// Express configuration
exports.app.set("port", process.env.PORT || 3000);
exports.app.use('/api/chat', chat_routes_1.default);
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
//# sourceMappingURL=app.js.map