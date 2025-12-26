import express from 'express';
import cors from 'cors';
import authRoutes from './src/server/routes/auth.js';
import journalRoutes from './src/server/routes/journal.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/journal', journalRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
