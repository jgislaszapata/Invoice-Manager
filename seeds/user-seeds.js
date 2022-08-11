const { User } = require('../models');

const userData = [
    {
        user_name: 'test1',
        user_email: 'test1@gmail.com',
        password: 'passwrd1'
    },
    {
        user_name: 'test2',
        user_email: 'test2@gmail.com',
        password: 'passwrd2'
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;