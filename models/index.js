//import models
const Invoice = require('./Invoice');
const Client = require('./Client');
const User = require('./User');

//Client has many Invoices
Client.hasMany(Invoice, {
    foreignKey: 'id',
    onDelete: 'SET NULL'
});

module.exports = { Client, Invoice };
