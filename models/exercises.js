module.exports = (sequelize, DataTypes) => {
      return sequelize.define('exercise', {
        title: {
          type: DataTypes.STRING,
        },
        text: {
          type: DataTypes.STRING,
        },
    });
  };
  