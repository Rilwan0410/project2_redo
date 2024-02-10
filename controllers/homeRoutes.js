const router = require('express').Router();
const { Listing, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const listingData = await Listing.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const listing = listingData.map((listing) => listing.get({ plain: true }));

    res.render('homepage', {
      listing,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', (req, res) => {
  // console.log(res)
  res.json(req.body);
});

router.get('/profile', async (req, res) => {
  console.log('profile page');
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Listing }],
    });

    // const user = userData.get({ plain: true });

    res.render('profile', { // Updated view name from 'listing' to 'productpage'
      // ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log('ran into an error');
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  res.render('signup', {});
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  console.log('Redirecting to /profile');
  res.render('login');
});

router.get('/homepage', async (req, res) => {
  try {
    // You can add logic specific to the /homepage route here if needed
    res.render('homepage', {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;