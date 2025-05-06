import '../config/env.js';
import { seedUsers } from './userSeeder.js'
import { seedActivities } from './activitiesSeeder.js'
import logger from '../middlewares/logger.js'

async function runSeeders() {
  try {
    logger.info('Seeding users...');
    await seedUsers();

    logger.info('Seeding activities...');
    await seedActivities();

    logger.info('Seeding completed!');
  } catch (err) {
    logger.error(`Error seeding data:${err.message}`);
    throw new Error(`Error seeding data`);
  }
}

runSeeders();
