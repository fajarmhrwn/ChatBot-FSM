"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
/**
 * Respons API.
 * @class
 */
class ApiResponse {
    success;
    message;
    data;
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=response.js.map