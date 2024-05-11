import { createClient } from "redis";
import RedisStore from "connect-redis";

let redisClient = createClient();
redisClient.connect().catch();

export default {
    store: new RedisStore({
        client: redisClient,
        prefix: "endevour:"
    }),
    secret: process.env.REDIS_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // in production use 'true'
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
}
