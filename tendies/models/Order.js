const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING(8),
                allowNull: false,
            },
            msgBody: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            paypalOrderId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            paypalCaptureId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
        }
    );

    return User;
};
