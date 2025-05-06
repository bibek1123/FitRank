import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  activity_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
  },
});

Activity.belongsTo(User, { foreignKey: 'user_id' });

export default Activity;
