const router = require('express').Router();
const { Posts, Comments, User } = require('../../models');
const auth = require('../../utils/auth');

router.post('/', auth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    const postWithUsername = await Posts.findByPk(newPost.id, {
      include: [
          {
              model: User,
              attributes: ['username'],
          },
      ],
  });
    res.status(200).json(postWithUsername);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const postsData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postsData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/singlepost/:id', auth, async (req, res) => {
  try {
      const postData = await Posts.findByPk(req.params.id, {
          include: [{ model: Comments,
              include: { model: User }
          }],
      });
      if (!postData) {
          res.status(404).json({ message: 'There is no post with this id.' });
          return;
      }
      const post = postData.get({ plain: true });
      res.render('single-post', { 
          post,
          loggedIn: req.session.loggedIn
      }
      );
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  };
});

router.put('/update/:id', auth, async (req, res) => {
  try {
      const updatedPost = await Posts.update(
          {
              title: req.body.title,
              content: req.body.content
          },
          {
              include: [{ model: Comments }, { model: User }],
              where: {
                  id: req.params.id,
              },
          }
      );
      res.status(200).json(updatedPost)
  } catch (err) {
      res.status(500).json(err);
  };
});

router.post('/addcomment/:id', auth, async (req, res) => {
  try {
      const post_id = parseInt(req.params.id);
      const commentData = await Comments.create({
          content: req.body.content,
          user_id: req.session.user_id,
          post_id: post_id
      });
      const commentWithUsername = await Comments.findByPk(commentData.id, {
          include: [
              {
                  model: User,
                attributes: ['username'],
              },
          ]
      });
      res.status(200).json(commentWithUsername);
  } catch (err) {
      res.status(500).json(err); 
  };
});

module.exports = router;

