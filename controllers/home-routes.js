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
    // these should go into the database to seed
    res.render('homepage', { popularNFTs })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// get individual collection route
router.get('/nft/collection/:name', async (req, res) => {
  try {
    // once db has the projects will use this code 
    // const dbNFTproject = await Projects.findOne(
    //   {
    //     where: { name: req.params.name },
    //     attributes: ['addrs']
    //   })
    const collection = popularNFTs.find(nft => nft.name === req.params.name)
    await Moralis.start({ serverUrl, appId })
    const NFTs = await Moralis.Web3API.token.getAllTokenIds({
      address: collection.addrs, limit: 30
    })
    let NFTcollection = NFTs.result
    for (const item of NFTcollection) {
      let metadata = JSON.parse(item['metadata'])
      let image = metadata['image'] ? metadata['image'] : false
      if (image.startsWith("ipfs")) {
        image_url = image.replace('ipfs://', '')
        formated_url = `https://ipfs.io/ipfs/${image_url}`
        item.formated_url = formated_url
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

router.get('/search', (req, res) => {
  res.render('search')
})

// search results
router.post('/nft/search', async (req, res) => {
  try {
    await Moralis.start({ serverUrl, appId })
    // q (required): The search string parameter
    // filter (required): What fields the search should match on. To look into the entire metadata set the value to global. To have a better response time you can look into a specific field like name.`
    // Available values: name; description; attributes; global; name, description; name, attributes; description, attributes; name, description, attributes
    // chain (optional): The blockchain to get data from. Default value Eth.
    const options = { q: req.body.q, filter: 'name', limit: 20 }
    let NFTSres = await Moralis.Web3API.token.searchNFTs(options)

    let result = NFTSres.result
    let nfts = []
    for (const item of result) {
      let metadata = JSON.parse(item['metadata'])
      let id = metadata['id'] ? metadata['id'] : false
      let name = metadata['name'] ? metadata['name'] : false
      let image = metadata['image'] ? metadata['image'] : false
      let description = metadata['description']
        ? metadata['description']
        : false
      let public_profile_link = metadata['public_profile_link']
        ? metadata['public_profile_link']
        : false
      let image_url = metadata['image_url'] ? metadata['image_url'] : false
      let image_url_cdn = metadata['image_url_cdn']
        ? metadata['image_url_cdn']
        : false
      let created_at = metadata['created_at'] ? metadata['created_at'] : false
      let is_exclusive = metadata['is_exclusive']
        ? metadata['is_exclusive']
        : false
      let is_special_edition = metadata['is_special_edition']
        ? metadata['is_special_edition']
        : false
      let nft = {
        id,
        name,
        image,
        description,
        public_profile_link,
        image_url,
        image_url_cdn,
        created_at,
        is_exclusive,
        is_special_edition,
      }
      nfts.push(nft)
    }
    res.json({ NFTS: nfts })
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

module.exports = router
