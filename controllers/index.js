const router = require('express').Router();

// Update the require statement to 'homeRoutes' instead of 'homeController'
const homeRoutes = require('./homeRoutes');

const apiRoutes = require('./api');

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

module.exports = router;