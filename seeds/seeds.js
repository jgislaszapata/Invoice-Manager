const sequelize = 
require('../config/connection');
const seedData = require('./invoiceData');


const seedAll = async (req,res) => {
    try{
  await sequelize.sync({ force: true });

 await seedData();

  process.exit(0);
    }
    catch (err) {
    res.status(500).json(err);
    }
};

seedAll();
