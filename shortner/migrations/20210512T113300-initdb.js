'use strict';

var Sequelize = require('sequelize');

var migrationCommands = [
    {
        fn: 'createTable',
        params: [
            "urls",
            {
                "slug": {
                    "type": Sequelize.STRING(8),
                    "field": "slug",
                    "primaryKey": true,
                },
                "fullUrl": {
                    "type": Sequelize.TEXT,
                    "field": "fullUrl",
                    "allowNull": false,
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "defaultValue": null,
                    "allowNull": true,
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
    {
        fn: "createTable",
        params: [
            "trackers",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true,
                },
                "slug": {
                    "type": Sequelize.STRING(8),
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "field": "slug",
                    "allowNull": false,
                    "references": {
                        "model": "urls",
                        "key": "slug",
                    },
                },
                "ip": {
                    "type": Sequelize.STRING,
                    "field": "ip",
                    "allowNull": false,
                },
                "dateAccessed": {
                    "type": Sequelize.DATE,
                    "field": "dateAccessed",
                    "allowNull": false,
                },
                "country": {
                    "type": Sequelize.STRING,
                    "field": "country",
                    "allowNull": false,
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city",
                    "allowNull": false,
                },
                "region": {
                    "type": Sequelize.STRING,
                    "field": "region",
                    "allowNull": false,
                },
                "postal": {
                    "type": Sequelize.STRING,
                    "field": "postal",
                    "allowNull": false,
                },
                "latitude": {
                    "type": Sequelize.FLOAT,
                    "field": "latitude",
                    "allowNull": false,
                },
                "longitude": {
                    "type": Sequelize.FLOAT,
                    "field": "longitude",
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

