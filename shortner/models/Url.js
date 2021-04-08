const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Url extends Model {}

    Url.init(
        {
            slug: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            fullUrl: {
                type: DataTypes.STRING,
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
