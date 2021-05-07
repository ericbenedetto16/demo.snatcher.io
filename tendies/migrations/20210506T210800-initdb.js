'use strict';

var Sequelize = require('sequelize');

var migrationCommands = [
    {
        fn: 'createTable',
        params: [
            "orders",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true,
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "allowNull": false,
                },
                "slug": {
                    "type": Sequelize.STRING(8),
                    "field": "slug",
                    "allowNull": false,
                },
                "msgBody": {
                    "type": Sequelize.TEXT,
                    "field": "msgBody",
                    "allowNull": false,
                },
                "paypalOrderId": {
                    "type": Sequelize.STRING,
                    "field": "paypalOrderId",
                    "allowNull": false,
                    "unique": true,
                },
                "paypalCaptureId": {
                    "type": Sequelize.STRING,
                    "field": "paypalCaptureId",
                    "allowNull": false,
                    "unique": true,
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
"up": function(queryInterface, Sequelize)
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

