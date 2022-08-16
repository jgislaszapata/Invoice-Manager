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
    res.render('dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
