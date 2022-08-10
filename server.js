//Express package
const express = require('express');
const routes = require('./routes');

//import database (sequelize) connection
const sequelize = require('./config/connection');

const app = express();

const PORT = prcoess.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//sync sequelize models to the database and then turn on the server to begin listening
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

console.log("Welcome to invoice manager");