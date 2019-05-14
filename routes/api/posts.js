const express = require('express');
const router = express.Router();
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');
// Personal Post model
const PersonPost = require('../../models/PersonPost');
// Validation
const validatePostInput = require('../../validation/post');

//====================================================================================

/*
  GET ROUTES:
    - '/posts/test'
    - '/posts/getpersonal/:id'
    - '/posts/'
    - '/posts/:id'
    - '/posts/getpersonal'
*/

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (_req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts/getpersonal/:id
// @desc    Get post by id
// @access  Public
router.get('/getpersonal/:id', (req, res) => {
  PersonPost.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (_req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(() =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

// @route   POST api/posts/getpersonal
// @desc    Get personal posts
// @access  Public
router.post('/getpersonal', (req, res) => {
  PersonPost.find({ handle: req.body.handle })
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(() => res.status(404).json({ nopostsfound: 'No posts found' }));
})

//====================================================================================

/*
  POST ROUTES:
    - '/posts/personal'
    - '/posts/like/personal/:id'
    - '/posts/unlike/personal/:id'
    - '/posts/comment/personal/:id'
    - '/posts/like/:id'
    - '/posts/unlike/:id'
    - '/posts/comment/:id'
    - '/posts/'
*/

// @route   POST api/posts/personal
// @desc    Create personal post
// @access  Private
router.post(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    if(req.body.avatar){
      var avatarItem = req.body.avatar;
    }
    else {
      var avatarItem = '';
    }
    const newPost = new PersonPost({
      text: req.body.text,
      handle: req.body.handle,
      name: req.body.name,
      avatar: avatarItem,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route   POST api/posts/like/personal/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/personal/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      PersonPost.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            // Get remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            // Splice out of array
            post.likes.splice(removeIndex, 1);
            // Save
            post.save().then(post => res.json(post));
          } else
            // Add user id to likes array
            post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/unlike/personal/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/personal/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      PersonPost.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }
          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice out of array
          post.likes.splice(removeIndex, 1);
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/comment/personal/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/personal/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    if(req.body.avatar){
      var avatarItem = req.body.avatar;
    }
    else {
      var avatarItem = '';
    }
    PersonPost.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: avatarItem,
          user: req.user.id
        };
        // Add to comments array
        post.comments.unshift(newComment);
        // Save
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            // Get remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            // Splice out of array
            post.likes.splice(removeIndex, 1);
            // Save
            post.save().then(post => res.json(post));
          } else
            // Add user id to likes array
            post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }
          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice out of array
          post.likes.splice(removeIndex, 1);
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    if(req.body.avatar){
      var avatarItem = req.body.avatar;
    }
    else {
      var avatarItem = '';
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: avatarItem,
          user: req.user.id
        };
        // Add to comments array
        post.comments.unshift(newComment);
        // Save
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    if(req.body.avatar){
      var avatarItem = req.body.avatar;
    }
    else {
      var avatarItem = '';
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: avatarItem,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//====================================================================================

/*
  DELETE ROUTES:
    - '/posts/delete/:id'
    - '/posts/comment/personal/:id/:comment_id'
    - '/posts/:id'
    - ' /posts/comment/:id/:comment_id'
*/

// @route   DELETE api/posts/delete/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      PersonPost.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }
          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   DELETE api/posts/comment/personal/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/personal/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    PersonPost.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }
        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }
          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }
        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        // Splice comment out of array
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;
