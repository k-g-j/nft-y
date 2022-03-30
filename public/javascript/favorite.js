const nftDivs = document.querySelectorAll('.nft-div')

document.querySelector('.nft-row').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-favorite')) {
    const btnClasses = e.target.classList
    let itemId = '';
    for (const $class of btnClasses) {
      if (target.classList.contains('associated-div-'))
      itemId = $class.split('-')[2]
      let itemClass = ".associated-item-" + itemId
      let itemDiv = $(itemClass)
      $(itemDiv).find('.myclass');
    }
    let nftUniqueName = $('.unique_name').innerText
    let nftName = $('.name').innerText
    let nftImage = $('.image').attr('src')
    let nftAmount = $('.amount').innerText
    let nftSymbol = $('.symbol').innerText
    let nftDescription = `${nftName} - ${nftAmount} ${nftSymbol}`

    // post /api/nft
    let faveBtn = $('.add-favorite')

    faveBtn.onclick = async () => {
      let faveAdded = await axios.post('/api/nft', {
        name: nftName,
        unique_name: nftUniqueName,
        image: nftImage,
        description: nftDescription,
      })
      console.log(faveAdded)
    }
  }
})
