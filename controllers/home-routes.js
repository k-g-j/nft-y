const router = require('express').Router()
const Moralis = require('moralis/node')
const { popularNFTs } = require('../src/collections')
const { Projects } = require('../models/Projects')
require('dotenv').config()
const serverUrl = process.env.serverUrl
const appId = process.env.appId

// homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', { popularNFTs })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// get individual collection route
router.get('/nft/collection/:name', async (req, res) => {
  try {
    const collection = popularNFTs.find(nft => nft.name === req.params.name)
    await Moralis.start({ serverUrl, appId })
    const NFTs = await Moralis.Web3API.token.getAllTokenIds({
      address: collection.addrs, chain: 'eth', limit: 30
    })
    let NFTcollection = NFTs.result
    for (const item of NFTcollection) {
      let metadata = JSON.parse(item['metadata'])
      let image = metadata['image'] ? metadata['image'] : false
      if (image.toString().startsWith("ipfs")) {
        image_url = image.replace('ipfs://', '')
        formated_url = `https://ipfs.io/ipfs/${image_url}`
        item.image = formated_url
      } else {
        item.image = image
      }
      let unique_name = metadata['name'] ? metadata['name'] : false
      item.unique_name = unique_name
    }
    res.render('collection', { NFTcollection })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// show the about page
router.get('/about', async (req, res) => {
  res.render('about')
})

// show the chat page
router.get('/chat', async (req, res) => {
  try {
    res.render('chat-home')
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})
router.get('/chat.handlebars', async (req, res) => {
  try {
    res.render('chat')
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// show login page
router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = router