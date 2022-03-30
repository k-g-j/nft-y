const Moralis = require('moralis/node')
require('dotenv').config();

const web3API = async () => {

/* Moralis init code */
const serverUrl = process.env.serverUrl
const appId = process.env.appId
const moralisSecret = process.env.moralisSecret;

await Moralis.start({ serverUrl, appId, moralisSecret });

    // calling `getTokenPrice({address:"tokenAddress", chain:"chainID"})` from web3API
    const price = await Moralis.Web3API.token.getTokenPrice(
    {address: "0xe9e7cea3dedca5984780bafc599bd69add087d56", chain: "bsc"})
}

module.exports = web3API;