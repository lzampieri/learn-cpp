const { disable } = require("debug");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exercise', {
        short_title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            is: /^[0-9a-zA-Z]{12}$/i
        },
        title: {
            type: DataTypes.STRING,
        },
        hardness: {
            type: DataTypes.INTEGER,
        },
    });
};
