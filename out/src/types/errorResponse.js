"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse {
    code;
    description;
    details;
    constructor(code, description, details) {
        this.code = code;
        this.description = description;
        this.details = details;
    }
    getCode() {
        return this.code;
    }
    getDescription() {
        return this.description;
    }
    getDetails() {
        return this.details;
    }
}
exports.default = ErrorResponse;
