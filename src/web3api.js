const Moralis = require('moralis/node')

const web3API = async () => {

/* Moralis init code */
const serverUrl = "https://dma5wmaeradr.usemoralis.com:2053/server";
const appId = "cMbJsVFmw89TtatEB7V2IWcVmHf1wiFRXzrzjSxk";
const moralisSecret = "WljAgxAnD5lZ9gtmwabpfqeVcYQVuXVJoKvU8TzxKQjXNe2TakC1afzPUU3EJ1RR";

await Moralis.start({ serverUrl, appId, moralisSecret });

    // calling `getTokenPrice({address:"tokenAddress", chain:"chainID"})` from web3API
    const price = await Moralis.Web3API.token.getTokenPrice(
    {address: "0xe9e7cea3dedca5984780bafc599bd69add087d56", chain: "bsc"})
    console.log(price);
}

module.exports = web3API;