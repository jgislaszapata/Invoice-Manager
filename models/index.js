//import models
const User = require('./user');
const Client = require('./client');
const Invoice = require('./invoice');

//Client has many Invoices
Client.hasMany(Invoice, {
    foreignKey: 'id',
    onDelete: 'SET NULL'
});

//invoice belongs to client
Invoice.belongsTo(Client, {
    foreignKey: 'id'
});

module.exports = { Client, Invoice, User };
