const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { default: axios } = require('axios');
const web3API = require('./src/web3api')

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
// const helpers = require('./utils/helpers');
// const hbs = exphbs.create({ helpers });
// app.engine('handlebars', hbs.engine);
// app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// routes
// app.use(require('./controllers/'));
// start server and connect to db
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
// });

  /* Moralis init code */


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})

app.get( "/", ( req, res ) => {
    web3API();
});

app.get('/search', async (req, res) => {
  const { data } = await axios.get('https://deep-index.moralis.io/api/v2/nft/search?chain=eth&format=decimal&q=pancake&filter=name', {
    headers:
      { 'x-api-key': 'jSR2NBKBbCWXYCZuH9MQtFAm4W0ONcSErMEElUA3VzCXa4UNvBSFbWfpwm4nBStp' }
  })
  let result = data.result
  result = result.map(({metadata,...rest}) => ({...rest}));
  res.send(result)
})