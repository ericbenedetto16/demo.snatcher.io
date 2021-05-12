const { Model } = require('sequelize');

// TODO: Add Optional Creator Information (UserId, etc.)
module.exports = (sequelize, DataTypes) => {
    class Url extends Model { }

    Url.init(
        {
            slug: {
                type: DataTypes.STRING(8),
                primaryKey: true,
            },
            fullUrl: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                defaultValue: null,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Url',
            tableName: 'urls',
        }
    );

    Url.associate = (models) => {
        Url.hasMany(models.Tracker, {
            foreignKey: 'slug',
            as: 'trackers',
        });
    };

    return Url;
};
