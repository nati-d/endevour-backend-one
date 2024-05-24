"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
let redisClient = (0, redis_1.createClient)();
redisClient.connect().catch();
exports.default = {
    store: new connect_redis_1.default({
        client: redisClient,
        prefix: "endevour:"
    }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV == 'production', // in production use 'true'
        httpOnly: false,
        // domain: 'endevour.org',
        // sameSite: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
};
