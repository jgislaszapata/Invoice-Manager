const router = require('express').Router();
const clientRoutes = require('./client-routes');
const userRoutes = require('./user-routes');

router.use('./clients', clientRoutes);
router.use('./users', userRoutes);

module.exports = router;