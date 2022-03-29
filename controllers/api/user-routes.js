const router = require('express').Router()
// authentication middleware
const checkAuth = require('../../utils/auth')

// TODO: FOR USER TO UPDATE THEIR PASSWORD, { individualHooks: true, } needs to be declared under Users.update declarations for bcrypt to work.

// TODO: add routes for getting users, creating a user, loging in a user, logging out a user, deleting a user

// NOTE: refer to module 14 and remember to use req.session.save() and req.session.destroy()

// api/users/seed -- seed the user table with dummy data
router.post('/seed', async (req, res) => {
  try {
    const userDBseed = await User.bulkCreate([
      {
        username: 'NFT guy',
        email: 'nftguy@email.com',
        password: 'password',
        wallet: '0x8a08e3Ce6CED24d376a13C544E45d4DDa02FaFEA',
      },
      {
        username: 'NFT dude',
        email: 'nftdude@email.com',
        password: 'password',
        wallet: '0xD78E2165f190066E16D515f72A7115774D4548b2',
      },
      {
        username: 'NFTina',
        email: 'nftina@email.com',
        password: 'password',
        wallet: '0xA1707c82aa2866955991c7f2C6F431d6619B8b4c',
      },
    ])
    res.json({ message: 'Seeded the user table with dummy data' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router