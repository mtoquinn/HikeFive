const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GroupSchema = new Schema({
  
  handle: {
    type: String,
    required: true,
    max: 40
  },
  name: {
    type: String,
    required: true,
    max: 75
  },
  avatar: {
    type: String
  },
  background: {
    type: String
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  skillstatus: {
    type: String,
    required: true
  },
  climber: {
    type: String,
    required: true
  },
  travel: {
    type:String,
    required:true
  },
  camp:{
    type:String,
    required:true
  },
  bio: {
    type: String
  },
  ownerid: {
    type:String,
    required:true
  },
  trip: [{
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    difficulty: {
      type: String,
    }
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  events: [{
    name: {
      type: String,
      required: true
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  teammember: [{
    ids: {
      type: String,
      required: true
    }
  }]
});
GroupSchema.index({
  handle: 'text'
});

module.exports = Group = mongoose.model('group', GroupSchema);
