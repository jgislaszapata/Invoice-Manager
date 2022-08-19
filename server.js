//Express package
const express = require('express');
const path = require('path');
//import database (sequelize) connection
const sequelize = require('./config/connection');
//Import session package
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//setting Handlebars.js as the default template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const bodyParser = require('body-parser')

//set up session
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
const app = express();
app.use(session(sess));

const routes = require('./routes');
//define PORT
const PORT = process.env.PORT || 8000;

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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