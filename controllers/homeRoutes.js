const router = require('express').Router();
const { where } = require('sequelize');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const uppercaseFirstLetter = (word) => {
  const firstLetterGone = word.slice(1);
  console.log(firstLetterGone);
  return word[0].toUpperCase() + firstLetterGone;
};

router.get('/', async (req, res) => {
  const sessionLive = req.session.loggedIn;
  if (req.session.user_id) {
    const user = await User.findOne({
      where: { id: req.session.user_id },
      raw: true,
    });
    return res.render('homepage', {
      sessionLive,
      user,
      helpers: uppercaseFirstLetter,
    });
  }

  res.render('homepage', );
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
  return res.render('profile', { user, sessionLive });
});

router.get('/signup', (req, res) => {
  return res.render('signup', {});
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
  return es.redirect('/login');
});

router.get('/login', (req, res) => {
  return res.render('login', {});
});

router.post('/login', async (req, res) => {
  let errors = [];
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username }, raw: true });
  console.log(user);
  let validPassword;
  if (user) {
    validPassword = await bcrypt.compare(password, user.password);
  }

  if (user && validPassword) {
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.loggedIn = true;
      console.log('successfully logged in');
      return res.redirect('/profile');
    });
  } else {
    errors.push('username or password incorrect, try again.');
    return res.render('login', { errors });
  }
  // res.render(req.body)
  // return res.render('homepage', {});
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
   return  res.redirect('/');
  });
});
router.get('/homepage', async (req, res) => {
  return res.render('homepage');
});

module.exports = router;
