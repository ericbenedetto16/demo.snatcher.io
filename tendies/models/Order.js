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
            recipient: {
                type: DataTypes.STRING,
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
            paypalAuthorizationId: {
                type: DataTypes.STRING,
                unique: true,
            },
            paypalCaptureId: {
                type: DataTypes.STRING,
                unique: true,
            },
            void: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
