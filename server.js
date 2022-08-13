//Express package
const express = require('express');

//Import session package
const session = require('express-session');
const path = require('path');

//set up session
const sess = {
    secret: 'Super secret secret',
    resave: false,
    savaUninitialized: true,
};

//import database (sequelize) connection
const sequelize = require('./config/connection');

const app = express();
app.use(session(sess));

const routes = require('./routes');
//define PORT
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);

//sync sequelize models to the database and then turn on the server to begin listening
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

console.log("Welcome to invoice manager");