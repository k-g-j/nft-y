const router = require('express').Router()
const Moralis = require('moralis/node')
require('dotenv').config()
const serverUrl = process.env.serverUrl
const appId = process.env.appId

router.get('/', (req, res) => {
  res.render('search')
})

// search results
router.post('/nft', async (req, res) => {
  try {
    await Moralis.start({ serverUrl, appId }) 
    const options = { q: req.body.q, filter: 'name, description, attributes', limit: 20 }
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

module.exports = router