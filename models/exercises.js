module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exercise', {
        title: {
            type: DataTypes.STRING,
        },
        hardness: {
            type: DataTypes.INTEGER,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
};
