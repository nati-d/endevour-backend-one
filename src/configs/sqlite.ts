import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDbConnection() {
    const db = await open({
        driver: sqlite3.Database,
        filename: process.env.SQLITE_STORE_PATH as string,
    });
    return db;
}
