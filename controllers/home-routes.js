const router = require('express').Router();
const { Posts, Comments } = require('../models');

// GET all Posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
    //   include: [
    //     {
    //       model: Comment,
    //       attributes: [],
    //     },
    //   ],
    });
    const posts = dbPostData.map((post) =>
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

// GET one gallery
router.get('/post/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const dbPostData = await Posts.findByPk(req.params.id, {
        // include: [
        //   {
        //     model: COmment,
        //     attributes: [],
        //   },
        // ],
      });
      const post = dbPostData.get({ plain: true });
      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// // GET one comment
// router.get('/comment/:id', async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//   } else {
//     // If the user is logged in, allow them to view the painting
//     try {
//       const dbCommentData = await Comment.findByPk(req.params.id);
//       const comment = dbCommentData.get({ plain: true });
//       res.render('comment', { comment, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
