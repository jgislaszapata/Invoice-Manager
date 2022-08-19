const router = require('express').Router();
//import node mailer package
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: ""

  }
});

//import client and invoice models
const { Client, Invoice } = require('../../models');

//find all invoice from database
//This routes gets called when Manage Invoice is clicked on dashboard
router.get('/', async (req, res) => {
  try {
    const invoiceData = await Invoice.findAll({
      include: [{
        model: Client,
        attributes: ['client_name']
      }]
    });
    const allInvoices = invoiceData.map((allInvoices) => allInvoices.get({ plain: true }));

    res.render('invoice',
      {
        allInvoices,
        loggedIn: req.session.loggedIn,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});


//routes gets invoked when new invoice button is clicked
router.get('/new', async (req, res) => {
  try {
    const clientData = await Client.findAll({
     attributes: { exclude: ['client_email', 'client_phone']}
    });
    const allClients = clientData.map((allClient) => allClient.get({ plain: true }));

    res.render('newinvoice',
      {
        allClients,
        loggedIn: req.session.loggedIn,
      });
  } catch (err) {
    res.status(500).json(err);
  }
  });
// router.post('/new', async(req, res) => {
//     try {
//         const clientData = await Client.create({
//         invoice_number: req.body.name,
//         amount: req.body.email,
//         due_date: req.body.phone,
//         memo:req.body.memo,
//         id:req.body.id,
//         });
//         res.status(200).json(clientData);
//       } catch (err) {
//         res.status(400).json(err);
//       }
// });


//find invoice by ref_num(primary key)
//this route gets invoked when edit icon is clicked on invoice page,
//allows user to edit invoice data
router.get('/:id', async (req, res) => {
  try {
    const invoiceData = await Invoice.findByPk(req.params.id);

    if (!invoiceData) {
      res.status(404).json({ message: 'No Invoice found with this id!' });
      return;
    } else {
      const invDetail = invoiceData.get({ plain: true });
      res.status(200).json(invDetail);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// //find invoice by ref_num(primary key)
// router.get('/edit/:id', async (req, res) => {
//   try {
//     const invoiceData = await Invoice.findByPk(req.params.id);

//     if (!invoiceData) {
//       res.status(404).json({ message: 'No Invoice found with this id!' });
//       return;
//     } else {
//       const invDetail = invoiceData.get({ plain: true });
//       res.render('invoice',
//         {
//           invDetail,
//           loggedIn: req.session.loggedIn,

//         });

//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//create a new invoice 
router.post('/new', async (req, res) => {
  try {
    const invoiceData = await Invoice.create({
      amount: req.body.amount,
      due_date: req.body.ddate,
      memo: req.body.memo,
      id: req.body.id,
    })
    const clientData = await Client.findOne({
      where: {
        id: req.body.id,
      },
    });

    const user = clientData.get({ plain: true });
    console.log(user);
    const options = {
      from: "",
      to: `${clientData.client_email}`,
      subject: "node project with JS",
      text: `Hello ${clientData.client_name} bill amount ${req.body.amount} is due on ${req.body.ddate}`
    }
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("sent: " + info.response);
    })
    res.status(200).json(invoiceData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update invoice details
router.put('/:id', async (req, res) => {
  console.log(req.body);
  try {
    const updatedInvoice = await Invoice.update({

      amount: req.body.amount,
      memo: req.body.memo,
      due_date: req.body.due_date,
    },
      {
        where: {
          invoice_number: req.params.id
        },
      });
    if (updatedInvoice) {
      res.status(200).json(updatedInvoice);
    } else {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete a invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoiceData = await Invoice.destroy({
      where: {
        invoice_number: req.params.id
      }
    });

    if (!invoiceData) {
      res.status(404).json({ message: 'No invoice found with this id!' });
      return;
    } else {
      res.render('invoice'), {
        loggedIn: req.session.loggedIn,
      }
    }
    res.status(200).json(invoiceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;