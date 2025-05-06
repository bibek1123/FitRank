import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Leaderboard = sequelize.define('Leaderboard', {
  user_id: {
    type: DataTypes.INTEGER,
    index:true,
    unique: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  total_points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  rank: {
    type: DataTypes.INTEGER,
  },
},{
  indexes: [
    {
      fields: ['user_id'],
    },
  ],
});

Leaderboard.belongsTo(User, { foreignKey: 'user_id' });

export default Leaderboard;
