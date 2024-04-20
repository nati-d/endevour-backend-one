"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
let redisClient = (0, redis_1.createClient)();
redisClient.connect().catch(console.error);
exports.default = {
    store: new connect_redis_1.default({
        client: redisClient,
        prefix: "endevour:"
    }),
    secret: "your_secret_key_here",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // in production use 'true'
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
};
