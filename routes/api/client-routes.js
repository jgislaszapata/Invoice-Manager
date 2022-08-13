const router = require('express').Router();

const { Client } = require('../../models/client');

//find all clients from database
router.get('/', async(req, res) => {
    try {
        const clientData = await Client.findAll();
        res.status(200).json(clientData);
      } catch (err) {
        res.status(500).json(err);
      }
});

//find client by id
router.get('/:id',async (req, res) => {
    try {
        const clientData = await Product.findByPk(req.params.id, {
         
          include: []
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
  

//create a new client 
router.post('/', async(req, res) => {
    try {
        const clientData = await Client.create(req.body);
        res.status(200).json(clientData);
      } catch (err) {
        res.status(400).json(err);
      }
});

//update client informaiton

    router.put('/:id', (req, res) => {
     Client.update({
        client_name:req.body.client_name,
        client_email:req.body.client_email,
        client_phone:req.body.client_phone,
     },
     {
        where:{
            client_id:req.params.client_id,
        },
     }
     ).then((updatedClient)=>{
        res.json(updatedClient);
     }).catch((err)=>{
        console.log(err);
        res.json(err);
     });
    });

//delete a client
router.delete('/:id',async (req, res) => {
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