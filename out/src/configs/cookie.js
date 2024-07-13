"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const express_session_sqlite_1 = __importDefault(require("express-session-sqlite"));
const Store = (0, express_session_sqlite_1.default)(express_session_1.default);
exports.default = {
    store: new Store({
        driver: sqlite3_1.default.Database,
        path: process.env.SQLITE_STORE_PATH,
        ttl: 1234,
        prefix: process.env.SESSION_KEY_PREFIX,
    }),
    secret: process.env.COOKIE_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.ENV == "production",
        domain: process.env.COOKIE_DOMAIN,
        sameSite: false,
    }
};
