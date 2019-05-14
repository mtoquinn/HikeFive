const Validator = require('validator');
const isEmpty = require('./is-empty');
const moment = require('moment');

module.exports = function validateTripInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.date = !isEmpty(data.date) ? data.date : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = 'Date field is required';
  }else if (!moment(data.date, "MM/DD/YYYY").isValid()) {
    errors.date = 'Invalid Date';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  }

  if (Validator.isEmpty(data.difficulty)) {
    errors.difficulty = 'Difficulty is required';
  }

  if (Validator.equals(data.difficulty, '0')) {
    errors.difficulty = 'Difficulty is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
