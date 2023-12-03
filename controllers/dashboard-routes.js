const router = require('express').Router();
const { User, Posts, Comments } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, {
                model: Comments,
                include: { model: User }
            }],
            where: {
                user_id: req.session.user_id
            }
        });
        const posts = postData.map((userPosts) => userPosts.get({ plain: true }));
        res.render('dashboard',
            {
                posts,
                loggedIn: req.session.loggedIn,
            });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/update/:id', auth, async (req, res) => {
    try {
        const postToEdit = await Posts.findByPk(req.params.id);
        const post = postToEdit.get({ plain: true });
        res.render('edit-post',
            {
                post,
                loggedIn: true
            })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;