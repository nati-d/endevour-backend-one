import session from "express-session";
import sqlite from 'sqlite3';
import sqliteFactory from 'express-session-sqlite';

const Store = sqliteFactory(session);

export default {
    store: new Store({
        driver: sqlite.Database,
        path: process.env.SQLITE_STORE_PATH as string,
        ttl: 1234,
        prefix: process.env.SESSION_KEY_PREFIX as string,
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
