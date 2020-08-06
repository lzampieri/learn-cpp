const Sequelize = require('sequelize');
 
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  sequelize: sequelize,
  applications: require('./applications')(sequelize,Sequelize),
  exercises: require('./exercises')(sequelize,Sequelize),
  users: require('./users')(sequelize,Sequelize)
}

module.exports = models;