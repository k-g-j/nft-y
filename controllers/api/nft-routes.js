const router = require('express').Router()
const sequelize = require('../../config/connection')
const { NFT, Users } = require('../../models')
// authentication middleware
const checkAuth = require('../../utils/auth')
const { route } = require('../dashboard-routes')

// get all nfts
router.get('/', async (req, res) => {
  try {
    dbNFTData = await NFT.findAll({
      attributes: [
        'id',
        'name',
        'imageurl',
        'addrs',
        'description',
        'projects_name',
        'users_name',
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    })
    res.json(dbNFTData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
// get a single NFT
router.get('/:id', async (req, res) => {
  try {
    dbNFTData = await NFT.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'name',
        'imageurl',
        'addrs',
        'description',
        'projects_name',
        'users_name',
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Users,
          attributes: ['username'],
        },
      ],
    })
    if (!dbNFTData) {
      res.status(404).json({ message: 'No post found with this id' })
      return
    }
    res.json(dbNFTData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
// create a NFT favorite
// this occurs when a user clicks the "favorites" button
router.post('/', checkAuth, async (req, res) => {
  try {
    const dbNFTData = await NFT.create({
      name: req.body.name,
      imageurl: req.body.imageurl,
      addrs: req.body.addrs,
      description: req.body.description,
      projects_name: req.body.projects_name,
      users_name: req.session.user_id,
    })
    res.json({ dbNFTData })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
// delete a NFT favorite
// this occurs when a user clicks the "remove" button
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const dbNFTData = await NFT.destroy({
      where: { id: req.params.id },
    })
    if (!dbNFTData) {
      res.status(404).json({ message: 'No post found with this id' })
      return
    }
    res.json(dbPostData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// api/nft/seed -- seed the NFT table with dummy data
router.get('/seed', async (req, res) => {
  try {
    const dbProjectsData = await Projects.bulkCreate([
      {
        image:
          'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130',
        name: 'Bored Ape Yacht Club',
        addrs: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
      },
      {
        image:
          'https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s130',
        name: 'Crypto Punks',
        addrs: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
      },
      {
        image:
          'https://www.pngitem.com/pimgs/m/341-3416788_cryptokitties-svg-hd-png-download.png',
        name: 'CryptoKitties',
        addrs: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
      },
      {
        image:
          'https://lh3.googleusercontent.com/l1wZXP2hHFUQ3turU5VQ9PpgVVasyQ79-ChvCgjoU5xKkBA50OGoJqKZeMOR-qLrzqwIfd1HpYmiv23JWm0EZ14owiPYaufqzmj1=s0',
        name: 'Bored Ape Kennel Club',
        addrs: '0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623',
      },
      {
        image:
          'https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s0',
        name: 'Doodles',
        addrs: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
      },
      {
        image:
          'https://lh3.googleusercontent.com/7gOej3SUvqALR-qkqL_ApAt97SpUKQOZQe88p8jPjeiDDcqITesbAdsLcWlsIg8oh7SRrTpUPfPlm12lb4xDahgP2h32pQQYCsuOM_s=s0',
        name: '0N1 Force',
        addrs: '0x3bf2922f4520a8BA0c2eFC3D2a1539678DaD5e9D',
      },
      {
        image:
          'https://lh3.googleusercontent.com/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI=s0',
        name: 'Mutant Ape Yacht Club',
        addrs: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6',
      },
      {
        image:
          'https://lh3.googleusercontent.com/LIpf9z6Ux8uxn69auBME9FCTXpXqSYFo8ZLO1GaM8T7S3hiKScHaClXe0ZdhTv5br6FE2g5i-J5SobhKFsYfe6CIMCv-UfnrlYFWOM4=s0',
        name: 'CyberKongz',
        addrs: '0x57a204AA1042f6E66DD7730813f4024114d74f37',
      },
      {
        image:
          'https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s0',
        name: 'Cool Cats NFT',
        addrs: '0x1A92f7381B9F03921564a437210bB9396471050C',
      },
      {
        image:
          'https://coincentral.com/wp-content/uploads/2022/01/deadfellaz.png',
        name: 'DeadFellaz',
        addrs: '0x2acAb3DEa77832C09420663b0E1cB386031bA17B',
      },
      {
        image: 'https://mma.prnewswire.com/media/1603390/LazyLion.jpg?w=500',
        name: 'Lazy Lions',
        addrs: '0x8943C7bAC1914C9A7ABa750Bf2B6B09Fd21037E0',
      },
      {
        image:
          'https://chaindebrief.com/wp-content/uploads/2021/07/axie-infinity-1.png',
        name: 'Axie Infinity',
        addrs: '0xF5D669627376EBd411E34b98F19C868c8ABA5ADA.',
      },
      {
        image: 'https://miro.medium.com/max/640/0*GCQlu6dpQwV_jXKr.png',
        name: 'Wizards & Dragons Game',
        addrs: '0x999e88075692bCeE3dBC07e7E64cD32f39A1D3ab',
      },
      {
        image:
          'https://cdn-612d39b2c1ac189e9851cc81.closte.com/wp-content/uploads/2021/11/Wolf-Game-1-360x360.png',
        name: 'Wolf Game',
        addrs: '0xEB834ae72B30866af20a6ce5440Fa598BfAd3a42',
      },
      {
        image: 'https://miro.medium.com/max/1400/1*tt4UiCERm8ZdzwQ5y1DSOw.png',
        name: 'Art Blocks',
        addrs: '0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a',
      },
      {
        image:
          'https://lh3.googleusercontent.com/6cVSUgEYbPR43dfnoNYbKnIvY7cfPHywosowwj7mLV9v36kRKUMRS68fHYsQTRXCnzI8nw2ZI7-CP1D-CFxRGhznYINSLvmh8DH3kA=w1400-k',
        name: 'Desperate ApeWives',
        addrs: '0xF1268733C6FB05EF6bE9cF23d24436Dcd6E0B35E',
      },
      {
        image: 'https://thedogepoundnft.com/static/media/26.38126541.jpg',
        name: 'The Doge Pound',
        addrs: '0xF4ee95274741437636e748DdAc70818B4ED7d043',
      },
      {
        image:
          'https://lh3.googleusercontent.com/YmtOxRTAXEhp8e_0pAwGrRzoaFjZI3sW1r4DPw-O5FYC92aVT2cZ5QtaUU6UcGRwtg56u_u3Ee5DI4oksEcE2zpLQ_6zHfYqculHlOk=w600',
        name: 'Pudgy Penguins',
        addrs: '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8',
      },
      {
        image:
          'https://meebits.larvalabs.com/public/images/homepage/homepagePunk1.jpg',
        name: 'Meebits',
        addrs: '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7',
      },
      {
        image:
          'https://hashmasksstore.blob.core.windows.net/hashmasksthumbs/12054.png',
        name: 'Hashmasks',
        addrs: '0x5872E64C3f93363822D2B1e4717Be3398FDCEA51',
      },
      {
        image: 'https://www.larvalabs.com/public/images/autoglyphs/glyph1.svg',
        name: 'Autoglyphs',
        addrs: '0xd4e4078ca3495DE5B1d4dB434BEbc5a986197782',
      },
    ])
    res.json({ message: 'Success' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
