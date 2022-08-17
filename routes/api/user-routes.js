const router = require('express').Router();

const { User } = require('../../models');

//create a new user
router.post('/', async (req, res) => {
   try{
      const userData = await User.create({
        user_name: req.body.name,
        user_email: req.body.email,
        password: req.body.password,
      });

      //set up sessions with a logged in data to true
      req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json(userData);
      });
 
   } catch(err) {
    res.status(400).json(err);
   }
});

//User login 
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        user_email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post('/', async (req, res) => {
  try {
    const Data =  await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    
    });
    req.session.save(() => {
      req.session.user_id = Data.id;
      req.session.logged_in = true;
    res.status(200).json(Data);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

 //user logout
 router.post('/logout', (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
 });

module.exports = router;