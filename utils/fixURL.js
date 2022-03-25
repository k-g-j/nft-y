module.exports = function fixURL(url) {
  if (url.startsWith("ipfs")) {
    return 'https://ipfs.moralis.io:2053/ipfs/' + url.split('ipfs://ipfs/').slice(-1)
  } else {
    return url + '?format=json'
  }
}