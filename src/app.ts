import express from 'express';
import { authMiddleware } from './middlewares/auth.middleware';
import telemetryRoutes from './modules/telemetry/telemetry.routes';

export const app = express();

app.use(express.json());
app.use(authMiddleware);

app.use(telemetryRoutes)

app.get('/', (_, res) => {
    res.status(200).json({ status: 'OK' });
})