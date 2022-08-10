//import models
const Invoice = require('./Invoice');
const Client = require('./Client');

//Client has many Invoices
Client.hasMany(Invoice, {
    foreignKey: 'id',
    onDelete: 'SET NULL'
});

module.exports = { Client, Invoice };
