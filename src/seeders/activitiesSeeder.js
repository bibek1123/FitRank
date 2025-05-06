import Activity from '../models/activity.js'
import logger from '../middlewares/logger.js'

export async function seedActivities() {

  const activities = [
    { user_id: 1, activity_time: new Date('2025-05-06T08:00:00'), points: 20 },
    { user_id: 1, activity_time: new Date('2025-05-06T09:00:00'), points: 20 },
    { user_id: 2, activity_time: new Date('2025-05-06T10:00:00'), points: 20 },
    { user_id: 2, activity_time: new Date('2025-05-06T11:00:00'), points: 20 },
    { user_id: 3, activity_time: new Date('2025-05-06T12:00:00'), points: 20 },
    { user_id: 3, activity_time: new Date('2025-05-06T13:00:00'), points: 20 },
    { user_id: 4, activity_time: new Date('2025-05-06T14:00:00'), points: 20 },
    { user_id: 4, activity_time: new Date('2025-05-06T15:00:00'), points: 20 },
    { user_id: 5, activity_time: new Date('2025-05-06T16:00:00'), points: 20 },
    { user_id: 5, activity_time: new Date('2025-05-06T17:00:00'), points: 20 },
  ];

  await Activity.bulkCreate(activities);

  logger.info('Dummy activities seeded!');
}

