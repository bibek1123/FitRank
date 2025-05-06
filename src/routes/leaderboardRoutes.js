import express from 'express';
import { getLeaderboard, recalculateRanks } from '../controllers/leaderboardController.js';
const router = express.Router();

router.get('/', getLeaderboard);
router.post('/recalculate', recalculateRanks);

export default router;
