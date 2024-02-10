const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');

router.use('/users', userRoutes);
router.use('/Listings', listingRoutes);

module.exports = router;
