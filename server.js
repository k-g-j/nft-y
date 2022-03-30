const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
require('dotenv').config();
// server
const app = express();
const PORT = process.env.PORT || 3001;

// session storage
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));
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

// set up socket for NFTY-CHORD
const server = http.createServer(app);
const io = socketio(server);

const botName = 'NFTY-Bot';

// Run when a client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, `Welcome to ${user.room}!`));

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })
  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  })

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
       // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
    })
    }
  })
})

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
});