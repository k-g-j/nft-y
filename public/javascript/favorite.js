const nftId = document.getElementById('nft-id').innerText

const nftUniqueName = document.getElementById('unique_name').innerText
const nftName = document.getElementById('name').innerText
const nftImage = document.getElementById('image').getAttribute('src')
const nftAmount = document.getElementById('amount').innerText
const nftSymbol = document.getElementById('symbol').innerText
const nftDescription = `${nftName} - ${nftAmount} ${nftSymbol}`

// post /api/nft
const faveBtn = document.getElementById('add-favorite')
const removeBtn = document.getElementById('remove-favorite')

faveBtn.onclick = async () => {
  let faveAdded = await axios.post('/api/nft', {
    name: nftName,
    unique_name: nftUniqueName,
    image: nftImage,
    description: nftDescription,
  })
  console.log(faveAdded)
}

removeBtn.onclick = async () => {
  let response = await axios.delete(`/api/nft/${nftId}`)
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText)
  }
}