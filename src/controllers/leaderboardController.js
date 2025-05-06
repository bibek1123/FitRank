import * as leaderboardService from '../services/leaderboardService.js';

const getLeaderboard = async (req, res) => {
  const { search } = req.query

  try {
    const leaderboard = await leaderboardService.getLeaderboard(search);
    logger.info("Leaderboard retrived successfully!");
    res.message = "Leaderboard retrived successfully!";
    return util.successResponse(leaderboard, res);
  } catch (err) {
    logger.error(err.message);
    res.message = err.message;
    return util.internalServerErrorResponse(res);
  }
};


const recalculateRanks = async (req, res) => {
  const filter = req.query.filter || 'day';
  try {
    const result = await leaderboardService.recalculateRanks(filter);
    logger.info("Rank recalculated successfully!");
    res.message = "Rank recalculated successfully!";
    return util.successResponse(result, res);
  } catch (err) {
    logger.error(err.message);
    res.message = err.message;
    return util.internalServerErrorResponse(res);
  }
};

export { getLeaderboard, recalculateRanks };
