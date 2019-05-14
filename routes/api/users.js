const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model
const User = require('../../models/User');

//====================================================================================

/*
  GET ROUTES:
    - '/users/test'
    - '/users/current'
*/

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (_req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id })
    .then(user => {
      if(!user) {
        errors.nouser = "There was no user found";
        return res.status.apply(404).json(errors);
      }
      res.json(user);
    })
    .catch(err => res.status(404).json(err));
  }
);

/*
    res.json({
      id: req.user.id,
      name: req.user.name,
      profile_avatar: req.user.profile_avatar,
      email: req.user.email
    });
*/

//====================================================================================

/*
  POST ROUTES:
    - '/users/login'
    - '/users/register'
    - '/users/updateFirst'
    - '/users/updateAvatar'
*/

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched, place any attribute from user model into the payload here
        const payload = { id: user.id, name: user.name, profile_avatar: user.profile_avatar }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (_err, token) => {
            res.json({
              success: true,
              first: user.create_profile,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        create_profile: false,
        profile_avatar: ''
      });
      bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/updateFirst
// @desc    update first field
// @access  Public
router.post('/updateFirst', (req, _res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { create_profile: req.body.first } },
    { new: true },
    (err, _doc) => {
      if (err) {
        console.log("Something wrong when updating first!");
      }
    }
  )
});

// @route   POST api/users/updateAvatar
// @desc    update avatar field
// @access  Public
router.post('/updateAvatar', (req, _res) => {
  User.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { profile_avatar: req.body.profile_avatar } },
    { new: true },
    (err, _doc) => {
      if (err) {
        console.log("Something wrong when updating avatar!");
      }
    }
  )
});

//====================================================================================

module.exports = router;
