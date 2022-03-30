const nftDivs = document.querySelectorAll('.nft-div')

document.querySelector('.nft-row').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-favorite')) {
    const btnClasses = e.target.classList
    let itemId = ''
    for (const $class of btnClasses) {
      if (target.classList.contains('associated-div-'))
        itemId = $class.split('-')[2]
      let itemClass = '.associated-item-' + itemId
      let itemDiv = $(itemClass)
      let nftId = $(itemDiv).find('.nft-id').text()
      let removeBtn = $(itemDiv).find('.remove-favorite')

      removeBtn.onclick = async () => {
        let response = await axios.delete(`/api/nft/${nftId}`)
        if (response.ok) {
          document.location.replace('/dashboard/')
        } else {
          alert(response.statusText)
        }
      }
    }
  }
})
