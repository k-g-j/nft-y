$('.nft-row').on('click', '.add-favorite', async (e) => {
  const data = $(e.target).data()
  const nftUniqueName = data.unique_name
  const nftName = data.name
  const nftImage = data.image
  const nftAmount = data.amount
  const nftSymbol = data.symbol
  const nftDescription = `${nftName} - ${nftAmount} ${nftSymbol}`
  const faveAdded = await axios.post('/api/nft', {
    name: nftName,
    unique_name: nftUniqueName,
    image: nftImage,
    description: nftDescription,
  })
  if (faveAdded.data.error) {
    $('.error-alert').text("Please log-in first!")
  }
  console.log(faveAdded)
})
