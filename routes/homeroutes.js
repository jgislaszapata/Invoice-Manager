const router = require('express').Router();
const { Invoice, User, Client } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/',  (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/invoice', async (req, res) => {
  try {
    const invoiceData = await Invoice.findAll();
    const invoice = invoiceData.map((invoice) => invoice.get({ plain: true }));
   // const invoice = invoiceData.get({ plain: true });
    res.render('invoice', {
      invoice,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
