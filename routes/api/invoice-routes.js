const router = require('express').Router();

const { Invoice } = require('../../models');

//find all invoice from database
router.get('/', (req, res) => {

});

//find invoice by ref_num
router.get('/:id', (req, res) => {

});

//create a new invoice 
router.post('/', (req, res) => {

});

//update invoice details
router.put('/:id', (req, res) => {

});

//delete a invoice
router.delete('/:id', (req, res) => {

});

module.exports = router;