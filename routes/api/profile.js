const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateTripInput = require('../../validation/trip');
const validateMatchInput = require('../../validation/matchData');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

//====================================================================================

/*
  GET ROUTES:
    - '/profile/test'
    - '/profile/'
    - '/profile/all'
    - '/profile/handle/:handle'
    - '/profile/:query'
    - '/profile/user/:user_id'
*/

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (_req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile/
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (_req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(() => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/:query
// @desc    Get all profiles that match search string
// @access  Public
router.get('/:query', (req, res) => {
  const errors = {};
  User.find({ name: { '$regex': req.params.query, '$options': "ix" } })
    .then(users => {
      Profile.find({ $or: [{ user: { '$in': users } }, { handle: new RegExp(req.params.query, 'i') }] })
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
          if (!profiles) {
            errors.noprofile = 'No profiles were found';
            res.status(404).json(errors);
          }
          res.json(profiles);
        })
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(() =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

//====================================================================================

/*
  POST ROUTES:
    - '/profile/'
    - '/profile/matchData'
    - '/profile/trips'
*/

// @route   POST api/profile/
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.zip) profileFields.zip = req.body.zip;
    if (req.body.avatar) { profileFields.avatar = req.body.avatar; }
    else { profileFields.avatar = ''; }
    if (req.body.background) { profileFields.background = req.body.background; }
    else { profileFields.background = ''; }
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.skillstatus) profileFields.skillstatus = req.body.skillstatus;
    if (req.body.climber) profileFields.climber = req.body.climber;
    if (req.body.travel) profileFields.travel = req.body.travel;
    if (req.body.camp) profileFields.camp = req.body.camp;
    if (req.body.bio) profileFields.bio = req.body.bio;
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: { create_profile: true } }
        );
      } else { // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: { create_profile: true } }
        );
      }
    });
  }
);

// @route   POST api/profile/matchData
// @desc    Add matchData to profile
// @access  Private
router.post(
  '/matchData',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMatchInput(req.body);
    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          "match.skillMin": req.body.skillMin,
          "match.skillMax": req.body.skillMax,
          "match.travel": req.body.travel,
          "match.camp": req.body.camp,
          "match.climber": req.body.climber,
          "match.country": req.body.country
        }
      }
    ).then(profile => res.json(profile));
  }
);

// @route   POST api/profile/trips
// @desc    Add trip to profile
// @access  Private
router.post(
  '/trips',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTripInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newTrip = {
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        difficulty: req.body.difficulty,
      };
      // Add to trip array
      profile.trip.unshift(newTrip);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//====================================================================================

/* 
  DELETE ROUTES:
    - '/profile/trips/:trip_id'
    - '/profile/'
*/

// @route   DELETE api/profile/trips/:trip_id
// @desc    Delete trip from profile
// @access  Private
router.delete(
  '/trips/:trip_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.trip
          .map(item => item.id)
          .indexOf(req.params.trip_id);
        // Splice out of array
        profile.trip.splice(removeIndex, 1);
        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

//====================================================================================

module.exports = router;
