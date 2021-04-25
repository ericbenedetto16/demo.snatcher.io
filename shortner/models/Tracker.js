const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tracker extends Model {}

    Tracker.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            slug: {
                type: DataTypes.STRING(8),
                allowNull: false,
                references: {
                    model: 'Url',
                    key: 'slug',
                },
            },
            ip: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dateAccessed: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            region: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            postal: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            latitude: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            longitude: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Tracker',
            tableName: 'trackers',
        }
    );

    Tracker.associate = (models) => {
        Tracker.belongsTo(models.Url, {
            foreignKey: 'slug',
            as: 'url',
        });
    };

    return Tracker;
};
