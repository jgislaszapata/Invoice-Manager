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


// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/profile/:email', async (req, res) => {
//    try {
//     const projectData = await User.findOne({
//       where: {
//         user_email: req.params.email,
//       },
//     });
//     const user = projectData.get({ plain: true });
//     res.render('dashboardnew', {
//       ...user,
      
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// router.get('/profile', async (req, res) => {
//   try {
//     const projectData = await User.findOne({
//       where: {
//         id:req.session.user_id,
//       },
//     });
//     const user = projectData.get({ plain: true });
//     res.render('dashboardnew', {
//       ...user,
//       logged_in: req.session.logged_in
    
// =======
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



// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });


 
  
module.exports = router;
