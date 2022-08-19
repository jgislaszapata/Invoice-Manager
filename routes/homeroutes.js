const router = require('express').Router();
const { Invoice, User, Client } = require('../models');

//routes is invoked for homepage
router.get('/', (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route is invoked whe login is clicked from dashboard
router.get('/login', async (req, res) => {
  try {
    res.render('login', {
      loggedIn: req.session.loggedIn,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

//route for email
router.get('/email', async (req, res) => {
  res.render('email');
});

// //route for new invoice 
// router.get('/newinvoice', async (req, res) => {
//   try {
//     res.render('newinvoice', {
//       loggedIn: req.session.loggedIn,
//       user_name: req.session.user_name,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
