const router = require('express').Router()
const { Users, NFT } = require('../../models')

// get all users
router.get('/', (req, res) => {
  Users.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// get a single user
router.get('/:id', (req, res) => {
  Users.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: NFT,
        attributes: [
          'id',
          'name',
          'unique_name',
          'image',
          'description',
          'users_name',
        ]
      },
    ],
  })
    .then((UserData) => {
      if (!UserData) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(UserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// create a new user
router.post('/', (req, res) => {
  Users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    wallet: req.body.wallet,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id
        req.session.username = dbUserData.username
        req.session.email = dbUserData.email
        req.session.wallet = dbUserData.wallet
        req.session.loggedIn = true
        res.json({ message: 'success'})
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

// login a user
router.post('/login', (req, res) => {
  Users.findOne({
    where: { email: req.body.email },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({
        message: 'No user with that email address!',
      })
      return
    }
    const validPassword = dbUserData.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' })
      return
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      req.session.email = dbUserData.email
      req.session.wallet = dbUserData.wallet
      req.session.loggedIn = true
      res.json({ user: dbUserData, message: 'You are now logged in!' })
    })
  })
})

// logout a user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

router.put('/:id', (req, res) => {
  Users.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'Invalid user!' })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'Invalid User!' })
        return
      }
      res.json(dbUserData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
