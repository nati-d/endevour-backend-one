"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConnection = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
async function getDbConnection() {
    const db = await (0, sqlite_1.open)({
        driver: sqlite3_1.default.Database,
        filename: process.env.SQLITE_STORE_PATH,
    });
    return db;
}
exports.getDbConnection = getDbConnection;
