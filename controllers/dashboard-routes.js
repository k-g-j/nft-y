const router = require('express').Router()
const Moralis = require('moralis/node')
const fixURL = require('../utils/fixURL')
const axios = require('axios')
const { NFT, User } = require('../models')
const checkAuth = require('../utils/auth')
require('dotenv').config()
const serverUrl = process.env.serverUrl
const appId = process.env.appId

// render dashboard
router.get('/', checkAuth, async (req, res) => {
  // get all user favorite nfts from DB
  try {
    const dbNFTData = await NFT.findAll({
      where: {
        users_name: req.session.user_id,
      },
      attributes: [
        'id',
        'name',
        'imageurl',
        'addrs',
        'description',
        'projects_name',
        'users_name',
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username', 'email', 'wallet'],
        },
      ],
    })
    const nft_faves = dbNFTData.map((nft) => nft.get({ plain: true }))
    res.render('dashboard', {
      nft_faves,
      user_id: req.session.user_id,
      loggedIn: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// if a user has sent their wallet address when registering this will return their personal NFTs
router.get('/usernfts', async (req, res) => {
  try {
    // const user = await User.findOne({ id: req.params.id })
    const options = { chain: 'eth', address: '0x8a08e3Ce6CED24d376a13C544E45d4DDa02FaFEA' }
    await Moralis.start({ serverUrl, appId })
    const userNFTs = await Moralis.Web3API.account.getNFTs(options)
    userNFTs.forEach(async function (nft) {
      let url = fixURL(nft.token_uri)
      const { data } = await axios.get(url)
      res.json(data)
    })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
