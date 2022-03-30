const nftDivs = document.querySelectorAll('.nft-div')

document.querySelector('.nft-row').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-favorite')) {
    let nftId = $('.nft-id').innerText
    let removeBtn = $('.remove-favorite')

    removeBtn.onclick = async () => {
      let response = await axios.delete(`/api/nft/${nftId}`)
      if (response.ok) {
        document.location.replace('/dashboard/')
      } else {
        alert(response.statusText)
      }
    }
  }
})
