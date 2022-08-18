const seedClient = require('./client-seeds');

const seedData = require('./invoiceData');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database synced');
    await seedClient();
    console.log('client data seeded');
    
     await seedData();
    console.log('Invoice data seeded');

    process.exit(0);
};

seedAll();