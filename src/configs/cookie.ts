import { createClient } from "redis";
import RedisStore from "connect-redis";

let redisClient = createClient();
redisClient.connect().catch(console.error);

export default {
    store: new RedisStore({
        client: redisClient,
        prefix: process.env.REDIS_PREFIX as string
    }),
    secret: process.env.COOKIE_SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: ( process.env.ENV as string ) == "production",
        domain: process.env.COOKIE_DOMAIN as string,
        sameSite: false,
    }
}

export { redisClient };
