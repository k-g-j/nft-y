const userWallet = document.getElementById('user-wallet-address').innerText
console.log(userWallet)
const userNFTDiv = document.getElementById('user-nfts')

const getUserNFTs = async () => {
  const { data } = await axios.post('/dashboard/usernfts', {userWallet} )
    console.log(data)
}

getUserNFTs();