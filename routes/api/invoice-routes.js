const router = require('express').Router();

const { Invoice } = require('../../models');

//find all invoice from database
router.get('/',  async(req, res) => {

    try {
        const invoiceData = await Invoice.findAll();
        res.status(200).json(invoiceData);
      } catch (err) {
        res.status(500).json(err);
      }
});

//find invoice by ref_num
router.get('/:id', async(req, res) => {
    try {
        const invoiceData = await async.findByPk(req.params.id, {
         
          include: [ref_num]
        });
    
        if (!invoiceData) {
          res.status(404).json({ message: 'No Invoice found with this id!' });
          return;
        }
    
        res.status(200).json(invoiceData);
      } catch (err) {
        res.status(500).json(err);
      }
});

//create a new invoice 
router.post('/', async(req, res) => {
    try {
        const invoiceData = await Invoice.create(req.body);
        res.status(200).json(invoiceData);
      } catch (err) {
        res.status(400).json(err);
      }
});

//update invoice details
router.put('/:id', (req, res) => {
    Invoice.update({
       invoice_number:req.body.invoice_number,
        amount:req.body.amount,
        memo:req.body.memo,   
        due_date:req.body.due_date, 
     },
     {
        where:{
            invoice_id:req.params.invoice_id,
        },
     }
     ).then((updatedInvoice)=>{
        res.json(updatedInvoice);
     }).catch((err)=>{
        console.log(err);
        res.json(err);
     });
});

//delete a invoice
router.delete('/:id', async (req, res) => {
    try {
        const invoiceData = await Invoice.destroy({
          where: {
            id: req.params.id
          }
        });
    
        if (!invoiceData) {
          res.status(404).json({ message: 'No invoice found with this id!' });
          return;
        }
    
        res.status(200).json(invoiceData);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;