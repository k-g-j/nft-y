const router = require('express').Router()
const Moralis = require('moralis/node')
const fixURL = require('../utils/fixURL')
require('dotenv').config()
const serverUrl = process.env.serverUrl
const appId = process.env.appId

// render dashboard
// router.get('/', (req, res) => {
//get all user favorite nfts from DB

//   res.render('dashboard')
// })

router.get('/dashboard/nfts/:id', async (req, res) => {
  try {
    const options = { chain: 'eth', address: user.wallet }
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
 