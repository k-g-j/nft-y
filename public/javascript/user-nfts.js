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
      let itemDiv = document.createElement('div')
      $(itemDiv).addClass('col-lg-4 col-md-6')
      itemDiv.append(image)
      let name = document.createElement('p')
      $(name).text(token.name)
      itemDiv.append(name)
      let amount = document.createElement('p')
      $(amount).text(token.amount)
      itemDiv.append(amount)
      let symbol = document.createElement('p')
      $(symbol).text(`Symbol: ${token.symbol}`)
      itemDiv.append(symbol)
      let block_number = document.createElement('p')
      $(block_number).text(token.block_number)
      itemDiv.append(block_number)
      let block_number_minted = document.createElement('p')
      $(block_number_minted).text(token.block_number_minted)
      itemDiv.append(block_number_minted)
      let contract_type = document.createElement('p')
      $(contract_type).text(token.contract_type)
      itemDiv.append(contract_type)
      userNFTDiv.append(itemDiv)
    }
  }
}

getUserNFTs()
