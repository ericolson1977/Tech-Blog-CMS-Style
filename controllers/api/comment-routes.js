const router = require('express').Router();
const { Comments } = require('../../models');
const auth = require('../../utils/auth');

router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Comments.update(
      {
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', auth, async (req, res) => {
    try {
      const deleteComment = await Comments.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deleteComment) {
        res.status(404).json({ message: 'No comment with this id!' });
        return;
      }
      res.status(200).json(deleteComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;