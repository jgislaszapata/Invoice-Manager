const router = require('express').Router();

const { Client, Invoice } = require('../../models');
const { update } = require('../../models/user');

//find all invoice from database
//This routes gets called when Manage Invoice is clicked on dashboard
router.get('/', async (req, res) => {
  try {
    const invoiceData = await Invoice.findAll({
      include: [{
        model: Client,
        attributes: ['client_name']
      }]
    });

    const allInvoices = invoiceData.map((allInvoices) => allInvoices.get({ plain: true }));
    
    res.render('invoice',
      {
        allInvoices,
        loggedIn: req.session.loggedIn,
        
      });
   
  } catch (err) {
    res.status(500).json(err);
  }
});

//find invoice by ref_num(primary key)
//this route gets invoked when edit icon is clicked on invoice page,
//allows user to edit invoice data
router.get('/:id', async (req, res) => {
  try {
    const invoiceData = await Invoice.findByPk(req.params.id);

    if (!invoiceData) {
      res.status(404).json({ message: 'No Invoice found with this id!' });
      return;
    } else {
      const invDetail = invoiceData.get({ plain: true });
     
      
      res.status(200).json(invDetail);
    
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//find invoice by ref_num(primary key)
router.get('/edit/:id', async (req, res) => {
  try {
    const invoiceData = await Invoice.findByPk(req.params.id);

    if (!invoiceData) {
      res.status(404).json({ message: 'No Invoice found with this id!' });
      return;
    } else {
      const invDetail = invoiceData.get({ plain: true });
      res.render('invoice',
        {
          invDetail,
          loggedIn: req.session.loggedIn,
          
        });
      
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new invoice 
router.post('/', async (req, res) => {
  try {
    const invoiceData = await Invoice.create(req.body);
    res.status(200).json(invoiceData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update invoice details
router.put('/:id', async (req, res) => {
  console.log(req.body);
  try{
    const updatedInvoice = await Invoice.update({

      amount: req.body.amount,
      memo: req.body.memo,
      due_date: req.body.due_date,
      
    },
      {
        where: {
          invoice_number: req.params.id
        },
      });
      if(updatedInvoice){
        //res.redirect(302, '/api/invoices')
        res.status(200).json(updatedInvoice);
      } else {
        res.status(500).json(err);
      }
  } catch  (err){
    res.status(400).json(err);
  } 
   
});

//delete a invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoiceData = await Invoice.destroy({
      where: {
        invoice_number: req.params.id
      }
    });

    if (!invoiceData) {
      res.status(404).json({ message: 'No invoice found with this id!' });
      return;
    } else {
      res.render('invoice'), {
        loggedIn: req.session.loggedIn,
        editInvoice: false,
      }
    }

    res.status(200).json(invoiceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;