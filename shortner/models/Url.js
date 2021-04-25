const { Model } = require('sequelize');

// TODO: Add Optional Creator Information (UserId, etc.)
module.exports = (sequelize, DataTypes) => {
    class Url extends Model {}

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
        },
        {
            sequelize,
            modelName: 'Url',
            tableName: 'urls',
        }
    );

    return Url;
};
