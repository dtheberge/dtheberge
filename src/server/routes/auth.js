import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbPromise from '../database.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-change-this';

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await dbPromise;

    const user = await db.get('SELECT * FROM users WHERE username = ?', username);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, username: user.username });
});

export default router;
