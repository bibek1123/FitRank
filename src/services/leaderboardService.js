import { Op } from 'sequelize';
import User from '../models/user.js';
import Leaderboard from '../models/leaderboard.js';
import Activity from '../models/activity.js'

const getLeaderboard = async (search) => {
    try {
        const whereCondition = {};

        if (search) {
            const userId = parseInt(search, 10);
            if (isNaN(userId)) {
                logger.error('Invalid search value. Must be a numeric user ID.')
                throw new Error('Invalid search value. Must be a numeric user ID.');
            }
            whereCondition.user_id = userId;
        }

        const leaderboardData = await Leaderboard.findAll({
            where: whereCondition,
            include: {
                model: User,
                attributes: ['id', 'full_name'],
            },
            order: [['rank', 'ASC']],
        });

        if (search && leaderboardData.length > 0) {
            const [searchedUser] = leaderboardData;
            return [searchedUser, ...leaderboardData.filter(u => u.user_id !== searchedUser.user_id)];
        }

        return leaderboardData;

    } catch (err) {
        logger.error(`Error in getLeaderboard: ${err.message}`);
        throw new Error('Failed to retrieve leaderboard');
    }
};

const recalculateRanks = async (filter) => {
    try {
        const allowedFilters = ['day', 'month', 'year'];

        if (!allowedFilters.includes(filter)) {
            logger.error("Invalid filter. Must be one of: day, month, year.")
            throw new Error('Invalid filter. Must be one of: day, month, year.')
        }

        let whereCondition = {};
        const now = new Date();
        if (filter === 'day') {
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            whereCondition.activity_time = {
                [Op.between]: [startOfDay, endOfDay],
            };
        } else if (filter === 'month') {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            whereCondition.activity_time = {
                [Op.between]: [startOfMonth, endOfMonth],
            };
        } else if (filter === 'year') {
            const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
            const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
            whereCondition.activity_time = {
                [Op.between]: [startOfYear, endOfYear],
            };
        }


        // Fetch activities
        const activities = await Activity.findAll({
            where: whereCondition,
            include: {
                model: User,
                attributes: ['id', 'full_name'],
            },
        });

        // Calculate total points per user
        const userPoints = {};

        activities.forEach((entry) => {
            if (userPoints[entry.user_id]) {
                userPoints[entry.user_id].total_points += entry.points;
            } else {
                userPoints[entry.user_id] = {
                    user_id: entry.user_id,
                    full_name: entry.User.full_name,
                    total_points: entry.points,
                };
            }
        });

        // Convert and sort
        const sortedUsers = Object.values(userPoints).sort((a, b) => b.total_points - a.total_points);

        // Recalculate rank
        let rank = 1;
        let lastPoints = null;
        let actualRank = 1;

        // Clear old leaderboard
        await Leaderboard.destroy({ where: {} });

        for (const user of sortedUsers) {
            if (user.total_points !== lastPoints) {
                actualRank = rank;
            }

            await Leaderboard.create({
                user_id: user.user_id,
                total_points: user.total_points,
                rank: actualRank,
            });

            lastPoints = user.total_points;
            rank++;
        }

        const updatedLeaderboard = await Leaderboard.findAll({
            include: {
                model: User,
                attributes: ['id', 'full_name'],
            },
            order: [['rank', 'ASC']],
        });

        return updatedLeaderboard;

    } catch (err) {
        logger.error(`Error in recalculateRanks: ${err.message}`);
        throw new Error('Failed to recalculate ranks');
    }
};

export { getLeaderboard, recalculateRanks };
