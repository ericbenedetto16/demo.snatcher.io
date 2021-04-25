'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('trackers', [
            {
                id: 1,
                slug: "upzx7Saw",
                ip: "183.194.245.254",
                dateAccessed: "2021-04-14T00:14:10.300Z",
                country: "United States",
                city: "Staten Island",
                region: "NY",
                postal: "10314",
                latitude: 40.6420,
                longitude: -74.1834,
                createdAt: "2021-04-28T00:14:10.300Z",
                updatedAt: "2021-04-20T00:14:10.300Z"
            },
            {
                id: 2,
                slug: 'axW8JaBj',
                ip: "100.148.132.184",
                dateAccessed: "2021-04-16T13:04:10.000Z",
                country: "United States",
                city: "New York",
                region: "NY",
                postal: "10308",
                latitude: 40.6317,
                longitude: -74.1596,
                createdAt: "2021-04-28T13:04:10.000Z",
                updatedAt: "2021-04-20T13:04:10.000Z"
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('trackers', {});
    },
};
