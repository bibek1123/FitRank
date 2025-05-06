import User from '../models/user.js'
import logger from '../middlewares/logger.js'

export async function seedUsers() {
  const users = [
    { full_name: 'John Doe' },
    { full_name: 'Jane Smith' },
    { full_name: 'Bob Johnson' },
    { full_name: 'Alice Williams' },
    { full_name: 'Charlie Brown' },
  ];

  await User.bulkCreate(users);

  logger.info('Dummy users seeded!');
}
