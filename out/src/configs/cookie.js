"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
let redisClient = (0, redis_1.createClient)();
exports.redisClient = redisClient;
redisClient.connect().catch(console.error);
exports.default = {
    store: new connect_redis_1.default({
        client: redisClient,
        prefix: process.env.REDIS_PREFIX
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
