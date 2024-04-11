"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    success;
    message;
    data;
    error;
    constructor(success, message, data, error) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}
exports.default = ApiResponse;
