const Sequelize = require('sequelize');
 
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  },
);

const models = {
  sequelize: sequelize,
  applications: require('./applications')(sequelize,Sequelize),
  exercises: require('./exercises')(sequelize,Sequelize),
  users: require('./users')(sequelize,Sequelize)
}

models.exercises.belongsToMany(models.applications, { through: 'ExercisesApplications' });
models.applications.belongsToMany(models.exercises, { through: 'ExercisesApplications' });

module.exports = models;