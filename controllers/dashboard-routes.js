const router = require('express').Router();

// render dashboard
router.get('/', (req, res) => {
  //get all user favorite nfts from DB

  res.render('dashboard')
})

module.exports = router;
