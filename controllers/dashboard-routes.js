const router = require('express').Router()
const Moralis = require('moralis/node')
const { NFT, Users } = require('../models')
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
        'unique_name',
        'image',
        'description',
        'users_name',
      ],
      include: [
        {
          model: Users,
          attributes: ['username', 'email', 'wallet'],
        },
      ],
    })
    const nft_faves = dbNFTData.map((nft) => nft.get({ plain: true }))
    res.render('dashboard', {
      nft_faves,
      user_wallet: req.session.wallet,
      user_id: req.session.user_id,
      loggedIn: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// if a user has sent their wallet address when registering this will return their personal NFTs
router.post('/usernfts', async (req, res) => {
  const options = {
    chain: 'eth',
    address: req.body.userWallet,
  }
  await Moralis.start({ serverUrl, appId })
  const userNFTsRes = await Moralis.Web3API.account.getNFTs(options)
  let userNFTs = userNFTsRes.result
  for (const item of userNFTs) {
    if (item.metadata) {
      let metadata = JSON.parse(item['metadata'])
      let image = metadata['image'] ? metadata['image'] : false
      if (image.toString().startsWith('ipfs')) {
        image_url = image.replace('ipfs://', '')
        formated_url = `https://ipfs.io/ipfs/${image_url}`
        item.image = formated_url
      } else {
        item.image = image
      }
    }
  }
  res.json(userNFTs)
})

module.exports = router