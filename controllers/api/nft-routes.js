const router = require('express').Router()
const sequelize = require('../../config/connection')
const { NFT, User } = require('../../models')
// authentication middleware
const checkAuth = require('../../utils/auth')

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
          model: User,
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
          model: User,
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
// this occurs when a user clicks the "add to favorites" button
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
// this occurs when a user clicks the "remove from favorites" button
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const dbNFTData = await NFT.destroy({ where: { id: req.params.id } })
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

module.exports = router
