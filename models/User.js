'use strict';
const { Model } = require("sequelize")
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class User extends Model { }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                type: DataTypes.STRING
            },
            lastName: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.VIRTUAL,
                validate: {
                    isLongEnough: (val) => {
                        if (val.length < 6) {
                            throw new Error("Please choose a longer password.")
                        }
                    }
                }
            },
            passwordHash: {
                type: DataTypes.STRING
            },
            role: {
                // admin, general
                type: DataTypes.ENUM("admin", "general")
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'user',
        });

    User.associate = (models) => {
        // associations can be defined here
    };

    User.beforeSave((user, options) => {
        if (user.password) {
            user.passwordHash = bcrypt.hashSync(user.password, 10);
        }
    });

    return User;
};
