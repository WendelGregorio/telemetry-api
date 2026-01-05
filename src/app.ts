import express from 'express';
import { authMiddleware } from './middlewares/auth.middleware';

export const app = express();

app.use(express.json());
app.use(authMiddleware);

app.get('/', (_, res) => {
    res.status(200).json({ status: 'OK' });
})