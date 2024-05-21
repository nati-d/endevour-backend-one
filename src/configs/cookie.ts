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
        secure: process.env.NODE_ENV == 'production', // in production use 'true'
        httpOnly: false,
        // domain: 'endevour.org',
        // sameSite: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}
