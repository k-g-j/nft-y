const searchInput = $('.search-bar')
const searchForm = $('.search-form')
const searchBtn = $('.search-btn')
const imagesDiv = $('.images-container')

$(searchForm).submit(function (e) {
  e.preventDefault()
  handleSearch()
})

$(searchBtn).click(function (e) {
  e.preventDefault()
  handleSearch()
})

const handleSearch = async () => {
  $(imagesDiv).html('')
  const q = searchInput.val().trim()
  const { data } = await axios.post('/search/nft', { q })
  const nftsArr = data.NFTS
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
      let favoriteBtn = document.createElement('button')
      $(favoriteBtn).text('favorite')
      $(favoriteBtn).click(async function (e) {
        console.log({
          name: item.name,
          image: item.image,
          description: item.description
        })
        try {
          const { data } = await axios.post('/nft/favorite', {
            name: item.name,
            imageurl: item.image,
            description: item.description,
          })
        } catch (err) {
          alert(err)
          console.log(err)
        }
      })
      imagesDiv[0].appendChild(favoriteBtn)
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
      let favoriteBtn = document.createElement('button')
      $(favoriteBtn).text('favorite')
      $(favoriteBtn).click(async function (e) {
        e.preventDefault()
        try {
        console.log({
            name: item.name,
            image: item.image_url,
            description: item.description
          })
          const { data } = await axios.post('/nft/favorite', {
            name: item.name,
            imageurl: item.image_url,
            description: item.description,
          })
        } catch (err) {
          alert(err)
          console.log(err)
        }
      })
      imagesDiv[0].appendChild(favoriteBtn)
    } else {
      item.img_src = null
    }
  }
}