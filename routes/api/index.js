const router = require('express').Router();
const clientRoutes = require('./client-routes');
const userRoutes = require('./user-routes');
const invoiceRoutes = require('./invoice-routes');

router.use('./clients', clientRoutes);
router.use('./users', userRoutes);
router.use('./invoices', invoiceRoutes);

module.exports = router;