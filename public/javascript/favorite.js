const nftDivs = document.querySelectorAll('.nft-div')

document.querySelector('.nft-row').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-favorite')) {
    const btnClasses = e.target.classList
    let itemId = ''
    for (const $class of btnClasses) {
      if (target.classList.contains('associated-div-'))
        itemId = $class.split('-')[2]
      let itemClass = '.associated-item-' + itemId
      let itemDiv = $(itemClass)
      let nftUniqueName = $(itemDiv).find('.unique_name').text()
      let nftName = $(itemDiv).find('.name').text()
      let nftAmount = $(itemDiv).find('.amount').text()
      let nftSymbol = $(itemDiv).find('.symbol').text()
      let nftDescription = `${nftName} - ${nftAmount} ${nftSymbol}`
      // post /api/nft
      let faveBtn = $(itemDiv).find('.add-favorite')
      faveBtn.onclick = async () => {
        console.log({
          name: nftName,
          unique_name: nftUniqueName,
          image: nftImage,
          description: nftDescription,
        })
        let faveAdded = await axios.post('/api/nft', {
          name: nftName,
          unique_name: nftUniqueName,
          image: nftImage,
          description: nftDescription,
        })
        console.log(faveAdded)
      }
    }
  }
})