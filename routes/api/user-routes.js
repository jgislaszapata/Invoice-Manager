const router = require('express').Router();

const { User } = require('../../models/user');

//create a new user
router.post('/', async (req, res) => {
   try{
      const userData = await User.create(newUser);
    res.status(200).json(userData);
   } catch(err) {
    res.status(400).json(err);
   }
});

module.exports = router;