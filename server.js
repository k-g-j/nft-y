const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const methodOverride = require('method-override')
const initializePassport = ('./utils/passport-config.js')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// server
const app = express();
const PORT = process.env.PORT || 3001;

// initializePassport(passport,
//   username => users.find(user => user.username === username),
//   id => users.find(user => user.id === id)
// )

// session storage
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // store: new SequelizeStore({
  //   db: sequelize
  // })
};
app.use(session(sess));
app.use(passport.initialize());
app.use(methodOverride('_method'))

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))
app.delete('/logout', (req, res) => {
  res.logOut()
  res.redirect('/login')
})

// view engine
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use(require('./controllers/'));
// start server and connect to db
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
// });

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})