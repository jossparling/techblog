const router = require('express').Router();
const { Post, User } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const userPosts = dbPostData.map((posts) =>
      posts.get({ plain: true })
    );

    res.render('homepage', {
      userPosts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at'
          ],
        },
      ],
    });

    const Posts = dbPostData.get({ plain: true });
    res.render('posts', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Posts.findByPk(req.params.id);

    const Posts = dbPostData.get({ plain: true });

    res.render('posts', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
