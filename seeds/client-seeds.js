const { Client } = require('../models');

const clientData = [
    {
        client_name: 'Ranjani',
        client_email: 'abc@gmail.com',
        client_phone: '123456'
    },
    {
        client_name: 'aldo',
        client_email: 'abcd@gmail.com',
        client_phone: '145678'
    },
    {
        client_name: 'jesus',
        client_email: 'qwerty@gmail.com',
        client_phone: '1267899'
    },
    {
        client_name: 'subhra',
        client_email: 'xyz@gmail.com',
        client_phone: '45567'
    },
    {
        client_name: 'olu',
        client_email: 'xyz1@gmail.com',
        client_phone: '675544'
    }
];

const seedClient = () => Client.bulkCreate(clientData);

module.exports = seedClient;