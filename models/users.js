const { disable } = require("debug");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            is: /^[0-9a-zA-Z]{12}$/i
        },
        password: {
            type: DataTypes.STRING(64),
        },
    });
};
