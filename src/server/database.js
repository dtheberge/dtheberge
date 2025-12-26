import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

const dbPromise = open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});

const initDb = async () => {
    const db = await dbPromise;

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        );

        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            content TEXT,
            date TEXT,
            FOREIGN KEY(userId) REFERENCES users(id)
        );
    `);

    // Check if admin user exists, if not create one
    const admin = await db.get('SELECT * FROM users WHERE username = ?', 'admin');
    if (!admin) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        await db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
        console.log('Admin user created (admin/password123)');
    }
};

initDb().catch(err => {
    console.error('Failed to initialize database:', err);
});

export default dbPromise;
