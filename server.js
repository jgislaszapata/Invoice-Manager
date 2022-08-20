//Express package
const express = require('express');
const path = require('path');
const routes = require('./controllers');
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

//define PORT
// const PORT = process.env.PORT || 3001;
app.set('port',process.env.PORT || 3001);

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



//turn on routes
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, () => console.log(`Now listening on ${app.get('port')}`));
});

console.log("Welcome to invoice manager");