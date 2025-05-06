import express from 'express';
import leaderboardRoutes from './leaderboardRoutes.js';

const router = express.Router();

router.use('/leaderboard', leaderboardRoutes);

export default router;
