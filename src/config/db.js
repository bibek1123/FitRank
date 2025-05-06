import { Sequelize } from 'sequelize'

/**
 * Mysql  Credentials
 */

const mysqldbHost = process.env.DB_HOST;
const mysqldbUser = process.env.DB_USER;
const mysqldbPassword = process.env.DB_PASSWORD;
const mysqldbName = process.env.DB_NAME;


/**
 * Stablish  Mysql  Connection 
 */
const sequelize = new Sequelize(mysqldbName, mysqldbUser, mysqldbPassword, {
    host: mysqldbHost,
    dialect: 'mysql',
    // Other options
});

sequelize.sync()
    .then(() => {
        console.log('MySQL database synced!');
    })
    .catch(err => {
        console.error('Error syncing MySQL database:', err);
    });

export default sequelize;
