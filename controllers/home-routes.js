const router = require('express').Router();
const Moralis = require('moralis/node')
const { popularNFTs } = require('../src/collections')
require('dotenv').config();
const serverUrl = 'https://dma5wmaeradr.usemoralis.com:2053/server'
const appId = 'cMbJsVFmw89TtatEB7V2IWcVmHf1wiFRXzrzjSxk'


router.get('/', (req, res) => {
  res.render('index')
});

router.get('/nft/popular', async (req, res) => {
  // these should go into the database to seed 
  res.json(popularNFTs)
})

router.get('/nft/collection/BoredApeYachtClub', async (req, res) => {
  // example response for name: "Bored Ape Yacht Club" the route will be /nft/collection/:name
  const options = popularNFTs.map(nft => nft.addrs)
  await Moralis.start({ serverUrl, appId });
  const NFTs = await Moralis.Web3API.token.getAllTokenIds({ address: options[0] });
  let NFTcollection = NFTs.result
  for (const item of NFTcollection) {
    let metadata = JSON.parse(item['metadata'])
    let image = metadata['image'] ? metadata['image'] : false
    image_url = image.replace('ipfs://', '')
    formated_url = `https://ipfs.io/ipfs/${image_url}`
    item.formated_url = formated_url
  }
  res.json(NFTcollection)
})

router.post('/nft/search', async (req, res) => {
  await Moralis.start({ serverUrl, appId });
// q (required): The search string parameter
// filter (required): What fields the search should match on. To look into the entire metadata set the value to global. To have a better response time you can look into a specific field like name.`
// Available values: name; description; attributes; global; name, description; name, attributes; description, attributes; name, description, attributes
// chain (optional): The blockchain to get data from. Default value Eth.
  const options = { q: req.body.q, filter: 'name', limit: 20 };
  let NFTSres = await Moralis.Web3API.token.searchNFTs(options);

  let result = NFTSres.result
  let nfts = []
  for (const item of result) {
    let metadata = JSON.parse(item['metadata'])
    let id = metadata['id'] ? metadata['id'] : false
    let name = metadata['name'] ? metadata['name'] : false
    let image = metadata['image'] ? metadata['image'] : false
    let description = metadata['description'] ? metadata['description'] : false
    let public_profile_link = metadata['public_profile_link'] ? metadata['public_profile_link'] : false
    let image_url = metadata['image_url'] ? metadata['image_url'] : false
    let image_url_cdn = metadata['image_url_cdn'] ? metadata['image_url_cdn'] : false
    let created_at = metadata['created_at'] ? metadata['created_at'] : false
    let is_exclusive = metadata['is_exclusive'] ? metadata['is_exclusive'] : false
    let is_special_edition = metadata['is_special_edition'] ? metadata['is_special_edition'] : false
    let nft = { id, name, image, description, public_profile_link, image_url, image_url_cdn, created_at, is_exclusive, is_special_edition }
    nfts.push(nft)
  }
  res.json({ NFTS: nfts})
})

module.exports = router;