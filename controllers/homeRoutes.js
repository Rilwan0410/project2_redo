const router = require('express').Router();
const { Listing, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage', {});
});

router.post('/login', (req, res) => {
  res.render('login', {});
});

router.get('/profile', async (req, res) => {
  res.render('profile', {});
});

router.get('/signup', (req, res) => {
  res.render('signup', {});
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/homepage', async (req, res) => {
  res.render('homepage');
});

module.exports = router;
