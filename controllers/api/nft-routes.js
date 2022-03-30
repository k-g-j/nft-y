const router = require('express').Router()
const { NFT, Users } = require('../../models')
// authentication middleware
const checkAuth = require('../../utils/auth')

// get all nfts
router.get('/', async (req, res) => {
  try {
    dbNFTData = await NFT.findAll({
      attributes: [
        'id',
        'name',
        'unique_name',
        'image',
        'description',
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
        'unique_name',
        'image',
        'description',
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
      unique_name: req.body.unique_name,
      image: req.body.image,
      description: req.body.description,
      users_name: req.session.user_id,
    })
    res.json({ message: 'success', data: dbNFTData })
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
    res.json({ message: 'success', data: dbNFTData })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
