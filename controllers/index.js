const router = require('express').Router();

// Update the require statement to 'homeRoutes' instead of 'homeController'
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
module.exports = router;
