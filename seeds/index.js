const seedClient = require('./client-seeds');
const seedUser = require('./user-seeds');
//const seedInvoice = require('./');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database synced');
    await seedClient();
    console.log('client data seeded');
    await seedUser();
    console.log('user data seeded');
    // await seedInvoice();
    // console.log('Invoice data seeded');

    process.exit(0);
};

seedAll();