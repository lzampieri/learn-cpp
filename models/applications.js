module.exports = (sequelize, DataTypes) => {
    return sequelize.define('applications', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
        },
        internal: {
            type: DataTypes.BOOLEAN,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    });
};
