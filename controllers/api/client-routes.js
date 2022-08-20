const router = require('express').Router();

//import client and invoice models
const { Client, Invoice } = require('../../models');


//find all clients from database. 
//this route is called when Add/Manage link is clicked on homepage
//on success displays the client table data on screen
router.get('/', async (req, res) => {
  try {
    const clientData = await Client.findAll({
      include: [{
        model: Invoice,
        attributes: ['invoice_number', 'amount', 'due_date', 'memo']
      }]
    });

    const data = clientData.map((Data) => Data.get({ plain: true }));
    res.render('client', {
      data, loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', async (req, res) => {
  res.render("newclient", {
    loggedIn: req.session.loggedIn,
  });
});

//create a new client 
//this routes is invoked when add new client is clicked and updates the information to client table
router.post('/newclient', async (req, res) => {
  try {
    const clientData = await Client.create({
      client_name: req.body.name,
      client_email: req.body.email,
      client_phone: req.body.phone,
    });
    res.status(200).json(clientData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//find client by id
//this route is called when edit icon is clicked.
router.get('/:id', async (req, res) => {
  try {
    const clientData = await Client.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: Invoice,
        attributes: ['invoice_number', 'amount', 'due_date', 'memo']
      }]
    });
    if (!clientData) {
      res.status(404).json({ message: 'No Client found with this id!' });
      return;
    }
    res.status(200).json(clientData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//update client informaiton
//this route is called when update button is clicked on edit client form
router.put('/:id', (req, res) => {
  Client.update({
    client_name: req.body.client_name,
    client_email: req.body.client_email,
    client_phone: req.body.client_phone,
  },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((updatedClient) => {
    res.json(updatedClient);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

//delete a client
//this route is called when delete icon is clicked on the client page
router.delete('/:id', async (req, res) => {
  try {
    const clientData = await Client.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!clientData) {
      res.status(404).json({ message: 'No client found with this id!' });
      return;
    }
    res.status(200).json(clientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;