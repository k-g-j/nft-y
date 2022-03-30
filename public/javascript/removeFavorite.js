$('.nft-row').on('click', '.remove-favorite', async (e) => {
  const data = $(e.target).data()
  let nftId = data.id
  let response = await axios.delete(`/api/nft/${nftId}`)
  console.log(response)
  document.location.replace('/dashboard/')
  if (err) {
    console.log(err)
  }
})
