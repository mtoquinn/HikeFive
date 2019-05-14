const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateGroupInput = require('../../validation/group');
const validateEventInput = require('../../validation/event');
const validateTripInput = require('../../validation/trip');

// Load Group Model
const Group = require('../../models/Group');
const Profile = require('../../models/Profile');

//====================================================================================
/*
  GET ROUTES:
    - '/group/handle/:handle'
    - '/group/search/:query'
    - '/group/events'
    - '/group/members'
    - '/group/groupBelong/:query'
    - MATCHMAKING ROUTES
*/

// @route   GET api/group/handle/:handle
// @desc    Get group by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Group.findOne({ handle: req.params.handle })
    .then(group => {
      if (!group) {
        errors.nogroup = 'There is no group for this handle';
        res.status(404).json(errors);
      }
      res.json(group);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/search/:query
// @desc    Get all groups where handle or name matches query
// @access  Public
router.get('/search/:query', (req, res) => {
  const errors = {};
  Group.find({
    $or: [
      { name: new RegExp(req.params.query, 'i') },
      { handle: new RegExp(req.params.query, 'i') }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/events
// @desc    Get event by id
// @access  Public
router.get('/events', (res) => {
  Group.find({ events: { $elemMatch: { name: "NewEvent" } } }).then(event => {
    if (!event) {
      errors.noevent = 'There is no event for this id';
      res.status(404).json(errors);
    }
    res.json(event);
  })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/members
// @desc    Get group members
// @access  Public
router.post('/members', (req, res) => {
  Profile.find({ _id: { $in: req.body.ids } })
    .populate('user', ['name', 'avatar'])
    .then(members => {
      if (!members) {
        errors.nogroup = 'There are no members';
        return res.status(404).json(errors);
      }
      res.json(members);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/groupBelong/:query
// @desc    Get all groups where that user is member of
// @access  Public
router.get('/groupBelong/:query', (req, res) => {
  const errors = {};
  Group.find({
    $or: [
      { ownerid: req.params.query },
      { teammember: { $elemMatch: { ids: req.params.query } } }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

/*
  MATCHMAKING ROUTES:
    - GROUP MATCHMAKING ROUTES
    - PROFILE MATCHMAKING ROUTES
*/

/*
  GROUP MATCHMAKING ROUTES:
      - '/group/matchCombo'
      - '/group/matchTravelCamp'
      - '/group/matchTravelClimb'
      - '/group/matchTravel'
      - '/group/matchCampClimb'
      - '/group/matchCamp'
      - '/group/matchClimb'
      - '/group/match'
*/

// @route   GET api/group/matchCombo
// @desc    Get all groups that match the query parameters
// @access  Public
router.get('/matchCombo', (req, res) => {
  const errors = {};
  Group.find({
    $and: [
      { climber: 'Yes' },
      { camp: 'Yes' },
      { travel: 'Yes' },
      { ownerid: { $ne: req.query.uid } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchTravelCamp
// @desc    Get all groups that match the query parameters
// @access  Public
router.get('/matchTravelCamp', (req, res) => {
  const errors = {};
  Group.find({
    $and: [
      { camp: 'Yes' },
      { travel: 'Yes' },
      { ownerid: { $ne: req.query.uid } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchTravelClimb
// @desc    Get all groups that match the query parameters
// @access  Public
router.get('/matchTravelClimb', (req, res) => {
  const errors = {};
  Group.find({
    $and: [
      { climber: 'Yes' },
      { travel: 'Yes' },
      { ownerid: { $ne: req.query.uid } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchTravel
// @desc    Get all groups that match the query parameters
// @access  Public
router.get('/matchTravel', (req, res) => {
  const errors = {};
  Group.find({
    $and: [
      { travel: 'Yes' },
      { ownerid: { $ne: req.query.uid } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchCampClimb
// @desc    Get all groups that match the query parameters
// @access  Public
router.get('/matchCampClimb', (req, res) => {
  const errors = {};
  Group.find({
    $and: [
      { climber: 'Yes' },
      { camp: 'Yes' },
      { ownerid: { $ne: req.query.uid } },
      { country: req.query.country },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchCamp
// @desc    Get all groups that match the query parameters
// @access  Public
router.get('/matchCamp', (req, res) => {
  const errors = {};
  Group.find({
    $and: [
      { camp: 'Yes' },
      { country: req.query.country },
      { ownerid: { $ne: req.query.uid } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchClimb
// @desc    Get all groups that match the query parameters
// @access  Public
router.get('/matchClimb', (req, res) => {
  const errors = {};
  Group.find({
    $and: [
      { climber: 'Yes' },
      { country: req.query.country },
      { ownerid: { $ne: req.query.uid } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/match
// @desc    Get all groups that match the query parameters
// @access  Public
router.get('/match', (req, res) => {
  const errors = {};
  Group.find({
    $and: [
      { country: req.query.country },
      { ownerid: { $ne: req.query.uid } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .then(groups => {
      if (!groups) {
        errors.nogroup = 'No groups were found';
        res.status(404).json(errors);
      }
      res.json(groups);
    })
    .catch(err => res.status(404).json(err));
});


/*
  PROFILE MATCHMAKING ROUTES:
    - '/group/matchPCombo'
    - '/group/matchPTravelCamp'
    - '/group/matchPTravelClimb'
    - '/group/matchPTravel'
    - '/group/matchPCampClimb'
    - '/group/matchPCamp'
    - '/group/matchPClimb'
    - '/group/matchP'
*/

// @route   GET api/group/matchPCombo
// @desc    Get all profiles that match the query parameters
// @access  Public
router.get('/matchPCombo', (req, res) => {
  const errors = {};
  Profile.find({
    $and: [
      { climber: 'Yes' },
      { camp: 'Yes' },
      { travel: 'Yes' },
      { handle: { $ne: req.query.handle } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'No profiles were found';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchPTravelCamp
// @desc    Get all profiles that match the query parameters
// @access  Public
router.get('/matchPTravelCamp', (req, res) => {
  const errors = {};
  Profile.find({
    $and: [
      { camp: 'Yes' },
      { travel: 'Yes' },
      { handle: { $ne: req.query.handle } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'No profiles were found';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchPTravelClimb
// @desc    Get all profiles that match the query parameters
// @access  Public
router.get('/matchPTravelClimb', (req, res) => {
  const errors = {};
  Profile.find({
    $and: [
      { climber: 'Yes' },
      { travel: 'Yes' },
      { handle: { $ne: req.query.handle } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = 'No profiles were found';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchPTravel
// @desc    Get all profiles that match the query parameters
// @access  Public
router.get('/matchPTravel', (req, res) => {
  const errors = {};
  Profile.find({
    $and: [
      { travel: 'Yes' },
      { handle: { $ne: req.query.handle } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'No profiles were found';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchPCampClimb
// @desc    Get all profiles that match the query parameters
// @access  Public
router.get('/matchPCampClimb', (req, res) => {
  const errors = {};
  Profile.find({
    $and: [
      { climber: 'Yes' },
      { camp: 'Yes' },
      { country: req.query.country },
      { handle: { $ne: req.query.handle } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'No profiles were found';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchPCamp
// @desc    Get all profiles that match the query parameters
// @access  Public
router.get('/matchPCamp', (req, res) => {
  const errors = {};
  Profile.find({
    $and: [
      { camp: 'Yes' },
      { country: req.query.country },
      { handle: { $ne: req.query.handle } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'No profiles were found';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchPClimb
// @desc    Get all profiles that match the query parameters
// @access  Public
router.get('/matchPClimb', (req, res) => {
  const errors = {};
  Profile.find({
    $and: [
      { climber: 'Yes' },
      { country: req.query.country },
      { handle: { $ne: req.query.handle } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'No profiles were found';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/group/matchP
// @desc    Get all profiles that match the query parameters
// @access  Public
router.get('/matchP', (req, res) => {
  const errors = {};
  Profile.find({
    $and: [
      { country: req.query.country },
      { handle: { $ne: req.query.handle } },
      { $and: [{ skillstatus: { $lte: req.query.skillMax } }, { skillstatus: { $gte: req.query.skillMin } }] }
    ]
  })
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'No profiles were found';
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

//====================================================================================
/*
  POST ROUTES:
    - '/group/'
    - '/group/edit'
    - '/group/trips'
    - '/group/events'
    - '/group/addmember'
*/

// @route   POST api/group/
// @desc    Create group 
// @access  Private
router.post(
  '/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const groupFields = {};
    if (req.body.handle) groupFields.handle = req.body.handle;
    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.avatar) { groupFields.avatar = req.body.avatar; }
    else { groupFields.avatar = ''; }
    if (req.body.background) { groupFields.background = req.body.background; }
    else { groupFields.background = ''; }
    if (req.body.zip) groupFields.zip = req.body.zip;
    if (req.body.skillstatus) groupFields.skillstatus = req.body.skillstatus;
    if (req.body.climber) groupFields.climber = req.body.climber;
    if (req.body.country) groupFields.country = req.body.country;
    if (req.body.travel) groupFields.travel = req.body.travel;
    if (req.body.camp) groupFields.camp = req.body.camp;
    if (req.body.bio) groupFields.bio = req.body.bio;
    if (req.body.ownerid) groupFields.ownerid = req.body.ownerid;
    // Social
    groupFields.social = {};
    if (req.body.youtube) groupFields.social.youtube = req.body.youtube;
    if (req.body.twitter) groupFields.social.twitter = req.body.twitter;
    if (req.body.facebook) groupFields.social.facebook = req.body.facebook;
    if (req.body.instagram) groupFields.social.instagram = req.body.instagram;
    // Check if handle exists
    Group.findOne({ handle: groupFields.handle }).then(group => {
      if (group) {
        errors.handle = 'That handle already exists';
        res.status(400).json(errors);
      }
      else {
        // Save Group
        new Group(groupFields).save().then(group => res.json(group));
      }
    });
  }
);

// @route   POST api/group/edit
// @desc    Edit group 
// @access  Private
router.post(
  '/edit', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const groupFields = {};
    if (req.body.handle) groupFields.handle = req.body.handle;
    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.avatar) { groupFields.avatar = req.body.avatar; }
    else { groupFields.avatar = ''; }
    if (req.body.background) { groupFields.background = req.body.background; }
    else { groupFields.background = ''; }
    if (req.body.zip) groupFields.zip = req.body.zip;
    if (req.body.country) groupFields.country = req.body.country;
    if (req.body.skillstatus) groupFields.skillstatus = req.body.skillstatus;
    if (req.body.climber) groupFields.climber = req.body.climber;
    if (req.body.travel) groupFields.travel = req.body.travel;
    if (req.body.camp) groupFields.camp = req.body.camp;
    if (req.body.bio) groupFields.bio = req.body.bio;
    // Social
    groupFields.social = {};
    if (req.body.youtube) groupFields.social.youtube = req.body.youtube;
    if (req.body.twitter) groupFields.social.twitter = req.body.twitter;
    if (req.body.facebook) groupFields.social.facebook = req.body.facebook;
    if (req.body.instagram) groupFields.social.instagram = req.body.instagram;

    Group.findOne({ handle: groupFields.handle }).then(group => {
      if (group) {
        // Update group
        Group.findOneAndUpdate(
          { handle: groupFields.handle },
          { $set: groupFields },
          { new: true }
        ).then(group => res.json(group));
      }
    });
  }
);

// @route   POST api/group/trips
// @desc    Add trip to group
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
    Group.findOne({ handle: req.body.handle }).then(group => {
      const newTrip = {
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        difficulty: req.body.difficulty,
      };
      // Add to trip array
      group.trip.unshift(newTrip);
      group.save().then(group => res.json(group));
    });
  }
);

// @route   POST api/group/events
// @desc    Add event to group
// @access  Private
router.post(
  '/events',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Group.findOne({ handle: req.body.handle }).then(group => {
      const newEvent = {
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        description: req.body.description,
      };
      // Add to events array
      group.events.unshift(newEvent);
      group.save().then(group => res.json(group));
    });
  }
);

// @route   POST api/group/addmember
// @desc    Add user to list of group members
// @access  Private
router.post(
  '/addmember',
  (req, res) => {
    Group.findOne({ handle: req.body.groupHandle }).then(group => {
      const userID = { ids: req.body.userId };
      //check if user is group creator
      if (group.ownerid == req.body.userId) {
        return res.status(400);
      }
      var arrayLength = group.teammember.length;
      for (var i = 0; i < arrayLength; i++) {
        if (group.teammember[i].ids == req.body.userId) {
          return res.status(400);
        }
      }
      // Add to teammember array
      group.teammember.unshift(userID);
      group.save();
    });
  }
);

//====================================================================================
/*
  DELETE ROUTES:
    - '/group/trips/:trip_id'
    - '/group/events/:event_id'
    - '/group/:id'
*/

// @route   DELETE api/group/trips/:trip_id
// @desc    Delete trip from group
// @access  Private
router.delete(
  '/trips/:trip_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Group.findOne({ handle: req.query.handle })
      .then(group => {
        // Get remove index
        const removeIndex = group.trip
          .map(item => item.id)
          .indexOf(req.params.trip_id);
        // Splice out of array
        group.trip.splice(removeIndex, 1);
        // Save
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/group/events/:event_id
// @desc    Delete event from group
// @access  Private
router.delete(
  '/events/:event_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Group.findOne({ handle: req.query.handle })
      .then(group => {
        // Get remove index
        const removeIndex = group.events
          .map(item => item.id)
          .indexOf(req.params.events_id);
        // Splice out of array
        group.events.splice(removeIndex, 1);
        // Save
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/group/:id
// @desc    Delete group
// @access  Private
router.delete(
  '/:id',
  (req, res) => {
    Group.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.json({ success: true })
    });
  }
);
//====================================================================================

module.exports = router;