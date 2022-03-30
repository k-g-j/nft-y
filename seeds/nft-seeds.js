const { NFT } = require('../models');
const nftData = [
 // array of objects here
];
const seedProjects = () => NFT.bulkCreate(nftData);
module.exports = seedNFT;