const router = require('express').Router();
// TODO: fill out these files to activate the routes 
// const userRoutes = require('./user-routes');
// const nftRoutes = require('./nft-routes');

// user create, delete, update route
// router.use('/user', userRoutes);

// route to assign nft favorite to user or remove from favorites
// router.use('/nft', nftRoutes)
const userRoutes = require('./user-routes.js');
const nftRoutes = require('./nft-routes');
const checkAuth = require('../../utils/auth');

router.use('/users', userRoutes);
router.use('/nfts', nftRoutes);

module.exports = router;


module.exports = router;