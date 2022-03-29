const router = require('express').Router();
// TODO: fill out these files to activate the routes

const userRoutes = require('./user-routes');
const nftRoutes = require('./nft-routes');
const checkAuth = require('../../utils/auth');

// user create, delete, update route
router.use('/users', userRoutes);

// route to assign nft favorite to user or remove from favorites
router.use('/nfts', nftRoutes)


module.exports = router;