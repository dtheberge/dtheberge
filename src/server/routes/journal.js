import express from 'express';
import jwt from 'jsonwebtoken';
import dbPromise from '../database.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-change-this';

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// GET all posts for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    const db = await dbPromise;
    const posts = await db.all('SELECT * FROM posts WHERE userId = ? ORDER BY id DESC', req.user.id);
    res.json(posts);
});

// POST a new entry
router.post('/', authenticateToken, async (req, res) => {
    const { content, date } = req.body;
    const db = await dbPromise;

    const result = await db.run(
        'INSERT INTO posts (userId, content, date) VALUES (?, ?, ?)',
        [req.user.id, content, date]
    );

    res.json({ id: result.lastID, content, date });
});

// DELETE a post
router.delete('/:id', authenticateToken, async (req, res) => {
    const db = await dbPromise;
    await db.run('DELETE FROM posts WHERE id = ? AND userId = ?', [req.params.id, req.user.id]);
    res.json({ success: true });
});

// EDIT a post
router.put('/:id', authenticateToken, async (req, res) => {
    const { content } = req.body;
    const db = await dbPromise;
    await db.run('UPDATE posts SET content = ? WHERE id = ? AND userId = ?', [content, req.params.id, req.user.id]);
    res.json({ success: true });
});

export default router;
