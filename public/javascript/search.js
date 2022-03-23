const searchInput = $('.search-bar')
const searchBtn = $('.search-btn')
const imagesDiv = $('.images-container')

$(searchInput).submit(function (e) { 
  e.preventDefault();
  handleSearch()
});

$(searchBtn).click(function (e) { 
  e.preventDefault();
  handleSearch()
});

const handleSearch = async () => {
  const q = searchInput.val().trim();
  const { data } = await axios.post('/nft/search', { q })
  const nftsArr = data.NFTS
  console.log(nftsArr)
  for (const item of nftsArr) {
    if (item.image) {
      item.img_src = item.image
      let nftImg = document.createElement('img')
      $(nftImg).attr('src', item.img_src)
      imagesDiv[0].appendChild(nftImg)
      let nftName = document.createElement('h2')
      $(nftName).text(item.name)
      imagesDiv[0].appendChild(nftName)
      let nftDescription = document.createElement('p')
      $(nftDescription).text(item.description)
      imagesDiv[0].appendChild(nftDescription)

    } else if (item.image_url) {
      item.img_src = item.image_url
      let nftImg = document.createElement('img')
      $(nftImg).attr('src', item.img_src)
      imagesDiv[0].appendChild(nftImg)
      let nftName = document.createElement('h2')
      $(nftName).text(item.name)
      imagesDiv[0].appendChild(nftName)
      let nftDescription = document.createElement('p')
      $(nftDescription).text(item.description)
      imagesDiv[0].appendChild(nftDescription)

    } else {
      item.img_src = null
    }
  }
}