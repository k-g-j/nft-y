const { Users } = require('../models')
const userData = [
  {
    username: 'NFT guy SEED',
    email: 'nftguyseed@email.com',
    password: 'password',
    wallet: '0x8a08e3Ce6CED24d376a13C544E45d4DDa02FaFEA',
  },
  {
    username: 'NFT dude SEED',
    email: 'nftdudeseed@email.com',
    password: 'password',
    wallet: '0xD78E2165f190066E16D515f72A7115774D4548b2',
  },
  {
    username: 'NFTina SEED',
    email: 'nftinaseed@email.com',
    password: 'password',
    wallet: '0xA1707c82aa2866955991c7f2C6F431d6619B8b4c',
  },
]
const seedUsers = () => Users.bulkCreate(userData)
module.exports = seedUsers
