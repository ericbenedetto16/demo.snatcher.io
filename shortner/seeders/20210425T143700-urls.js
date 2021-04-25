'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('urls', [
            {
               slug: 'upzx7Saw',
               fullUrl: 'https://ericbenedetto.tech',
               createdAt: '2021-04-25 18:20:20',
               updatedAt: '2021-04-25 18:20:20',
            },
            {
                slug: 'axW8JaBj',
                fullUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                createdAt: '2021-04-25 18:41:27',
                updatedAt: '2021-04-25 18:41:27',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('urls', {});
    },
};
