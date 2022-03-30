// TODO: FOR USER TO UPDATE THEIR PASSWORD, { individualHooks: true, } needs to be declared under Users.update declarations for bcrypt to work.

// TODO: add routes for getting users, creating a user, loging in a user, logging out a user, deleting a user

// NOTE: refer to module 14 and remember to use req.session.save() and req.session.destroy()

const router = require('express').Router();
const { Users, NFT, Projects } = require('../../models');

router.get('/', (req, res) => {
  Users.findAll({
    attributes: { exclude: ['password'] },
  }).then(UserData => res.json(UserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/:id', (req, res) => {
  Users.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: NFT,
        attributes: ['id', 'name', 'imageurl', 'addrs', 'description'],
        include: {
          model: Projects,
          attributes: ['name']
        }
      },
    ]
  })
    .then(UserData => {
      if (!UserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(UserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    wallet: req.body.wallet
  })
    .then(UserData => res.json(UserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(UserData => {
    if (!UserData) {
      res.status(400).json({ message: 'Invalid email address!' });
      return;
    }
    const validPassword = UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Wrong password' });
      return;
    }

    res.json({ user: dbUserData, message: 'Logged in!' });
  });

})

//Need a log out!

router.put('/:id', (req, res) => {
  Users.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(UserData => {
    if (!UserData[0]) {
      res.status(404).json({ message: 'Invalid user!' });
      return;
    }
    res.json(UserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(UserData => {
    if (!UserData) {
      res.status(404).json({ message: 'Invalid User!' });
      return;
    }
    res.json(UserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router