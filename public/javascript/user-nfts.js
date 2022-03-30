const userWallet = $('#user-wallet-address').data('walletaddress')

const userNFTDiv = document.getElementById('user-nfts')

const getUserNFTs = async () => {
  const { data } = await axios.post('/dashboard/usernfts', { userWallet })
  for (const token of data) {
    if (token.image) {
      let image = document.createElement('img')
      $(image).attr('src', token.image)
      $(image).width(100)
      $('img').on('error', function () {
        $(this).attr('src', '')
      })
      userNFTDiv.append(image)
      let name = document.createElement('p')
      $(name).text(token.name)
      userNFTDiv.append(name)
      let amount = document.createElement('p')
      $(amount).text(token.amount)
      userNFTDiv.append(amount)
      let symbol = document.createElement('p')
      $(symbol).text(`Symbol: ${token.symbol}`)
      userNFTDiv.append(symbol)
      let block_number = document.createElement('p')
      $(block_number).text(token.block_number)
      userNFTDiv.append(block_number)
      let block_number_minted = document.createElement('p')
      $(block_number_minted).text(token.block_number_minted)
      userNFTDiv.append(block_number_minted)
      let contract_type = document.createElement('p')
      $(contract_type).text(token.contract_type)
      userNFTDiv.append(contract_type)
    }
  }
}

getUserNFTs()
