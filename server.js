const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const uppercaseFirstLetter = (word) => {
  const firstLetterGone = word.slice(1);
  console.log(firstLetterGone);
  return word[0].toUpperCase() + firstLetterGone;
};
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers: { uppercaseFirstLetter } });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(express.urlencoded({ extended: true }));
app.use(session(sess));
app.use(routes);
app.use(express.json());
app.use(express.static('public'));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
