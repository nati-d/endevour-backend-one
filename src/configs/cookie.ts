import { createClient } from "redis";
import RedisStore from "connect-redis";

let redisClient = createClient();
redisClient.connect().catch(console.error);

export default {
    store: new RedisStore({
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
}
