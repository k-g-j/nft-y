const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// server
const app = express();
const PORT = process.env.PORT || 3001;
// session storage
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const sess = {
//   secret: 'deepest darkest secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };
// app.use(session(sess));
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