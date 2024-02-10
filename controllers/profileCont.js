// controllers/profileController.js

const express = require('express');
const router = express.Router();

// Assuming you have a 'profile.handlebars' view
router.get('/profile', (req, res) => {
  res.render('profile', { pageTitle: 'Profile' });
});

module.exports = router;