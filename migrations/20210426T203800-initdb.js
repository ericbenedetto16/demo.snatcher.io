'use strict';

var Sequelize = require('sequelize');

var migrationCommands = [
    {
        fn: 'createTable',
        params: [
            "users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true,
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName",
                    "allowNull": false,
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName",
                    "allowNull": false,
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "allowNull": false,
                    "unique": true,
                },
                "password": {
                    "type": Sequelize.TEXT,
                    "field": "password",
                    "allowNull": false,
                },
                "role": {
                    "type": Sequelize.ENUM('admin', 'general'),
                    "field": "role",
                    "allowNull": false,
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {},
        ],
    },
];


module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    }
};

