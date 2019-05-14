const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.skillstatus = !isEmpty(data.skillstatus) ? data.skillstatus : '';
  data.zip = !isEmpty(data.zip) ? data.zip : '';
  data.avatar = !isEmpty(data.avatar) ? data.avatar : '';
  data.background = !isEmpty(data.background) ? data.background : '';


  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required';
  }
  else {
    if (!Validator.isAlphanumeric(data.handle)) {
      errors.handle = 'Handle cannot contain special characters';
    }
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
      errors.handle = 'Handle needs to between 2 and 40 characters';
    }
  }

  if (Validator.isEmpty(data.zip)) {
    errors.zip = 'Postal Code is required';
  } else if (!Validator.isAlphanumeric(data.zip)) {
    errors.zip = 'Postal Code can only contain numbers and letters';
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = 'You must select your country';
  }

  if (Validator.equals(data.country, '0')) {
    errors.country = 'You must select your country';
  }

  if (Validator.isEmpty(data.skillstatus)) {
    errors.skillstatus = 'Field is required';
  }

  if (Validator.equals(data.skillstatus, '0')) {
    errors.skillstatus = 'Field is required';
  }

  if (Validator.isEmpty(data.climber)) {
    errors.climber = 'Field is required';
  }

  if (Validator.equals(data.climber, '0')) {
    errors.climber = 'Field is required';
  }

  if (Validator.isEmpty(data.travel)) {
    errors.travel = 'Field is required';
  }

  if (Validator.equals(data.travel, '0')) {
    errors.travel = 'Field is required';
  }

  if (Validator.isEmpty(data.camp)) {
    errors.camp = 'Field is required';
  }

  if (Validator.equals(data.camp, '0')) {
    errors.camp = 'Field is required';
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
