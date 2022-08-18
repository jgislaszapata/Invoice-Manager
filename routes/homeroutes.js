const router = require('express').Router();
const { Invoice, User, Client } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/',  (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try{
    res.render('login', {
      loggedIn: req.session.loggedIn,
      user_name: req.session.user_name, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
   
});

router.get('/email', async (req, res) => {
  
    res.render('email');

});
// router.get('/invoice', async (req, res) => {
//   try {
//     const invoiceData = await Invoice.findAll();
//     const invoice = invoiceData.map((invoice) => invoice.get({ plain: true }));
//    // const invoice = invoiceData.get({ plain: true });
//     res.render('invoice', {
//       invoice,
//       loggedIn: req.session.loggedIn

//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });


 
  
module.exports = router;
