const router = require('express').Router();
const { where } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcrypt');



router.get('/', async (req, res) => {
  const uppercaseFirstLetter = (word) => {
    const firstLetterGone = word.slice(1);
    console.log(firstLetterGone);
    return word[0].toUpperCase() + firstLetterGone;
  };
  
  const sessionLive = req.session.loggedIn;
  if (req.session.user_id) {
    const user = await User.findOne({
      where: { id: req.session.user_id },
      raw: true,
    });
    res.render('homepage', { sessionLive, user });
  }

  res.render('homepage', { sessionLive, helpers: uppercaseFirstLetter });
});

router.get('/profile', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  const sessionLive = req.session.loggedIn;
  console.log(req.session);
  const user = await User.findOne({
    where: { id: req.session.user_id },
    raw: true,
  });
  console.log(user);
  res.render('profile', { user, sessionLive });
});

router.get('/signup', (req, res) => {
  res.render('signup', {});
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);

  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username,
    password: hashedPassword,
    email: req.body.email,
  });

  // res.render('signup', {});
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  return res.render('login', {});
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username }, raw: true });
  console.log(user);
  let validPassword = await bcrypt.compare(password, user.password);
  console.log(validPassword);
  if (validPassword) {
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.loggedIn = true;
      console.log('successfully logged in');
      res.redirect('/profile');
    });
  } else {
    return res.json({ msg: 'failed to log in' });
  }
  // res.render(req.body)
  // return res.render('homepage', {});
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});
router.get('/homepage', async (req, res) => {
  res.render('homepage');
});

module.exports = router;
