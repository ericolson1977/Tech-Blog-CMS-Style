const router = require('express').Router();
const { Posts, User, Comments } = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', auth, async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comments,
          attributes: ['username'],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'There is no post with this id.' });
      return;
    }
    const post = postData.get({ plain: true });
    res.status(200).json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });
    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  } catch (err) {
    console.log(err);
  }
});

router.get('/create', async (req, res) => {
  try {
    res.render('new-post', {
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get('/update', auth, async (req, res) => {
  try {
    res.render('edit-post', {
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;