const  Invoice  = require('../models/invoice');

const data = [
  {
    amount: 200,
    due_date: 'January 29, 2023',
    memo: 'memo1',
    
  },
  {
    amount: 400,
    due_date: 'January 25, 2023',
    memo: 'memo2',
    
  },
  {
    amount: 600,
    due_date: '2022-08-22 05:12:59',
    memo: 'memo3',
    

  },
    
  {
    amount: 800,
    due_date: '2022-07-11 05:12:59',
    memo: 'memo4',
    
  },
];

const seedData = () => Invoice.bulkCreate(data);

module.exports = seedData;
