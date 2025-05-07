import Activity from '../models/activity.js'
import logger from '../middlewares/logger.js'

export async function seedActivities() {

  const activities = [
    { user_id: 1, activity_time: new Date(), points: 20 },
    { user_id: 1, activity_time: new Date(), points: 20 },
    { user_id: 2, activity_time: new Date(), points: 20 },
    { user_id: 2, activity_time: new Date(), points: 20 },
    { user_id: 3, activity_time: new Date(), points: 20 },
    { user_id: 3, activity_time: new Date(), points: 20 },
    { user_id: 4, activity_time: new Date(), points: 20 },
    { user_id: 4, activity_time: new Date(), points: 20 },
    { user_id: 5, activity_time: new Date(), points: 20 },
    { user_id: 5, activity_time: new Date(), points: 20 },
  ];

  await Activity.bulkCreate(activities);

  logger.info('Dummy activities seeded!');
}

