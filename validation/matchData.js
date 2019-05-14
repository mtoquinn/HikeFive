const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMatchInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.skillMin)) {
    errors.skillMin = 'Skill Min field is required';
  }

  if (Validator.equals(data.skillMin, '0')) {
    errors.skillMin = 'Skill Min field is required';
  }

  if (Validator.isEmpty(data.skillMax)) {
    errors.skillMax = 'Skill Max field is required';
  }

  if (Validator.equals(data.skillMax, '0')) {
    errors.skillMax = 'Skill Max field is required';
  }

  if (Validator.isEmpty(data.travel)) {
    errors.travel = 'Travel field is required';
  }

  if (Validator.equals(data.travel, '0')) {
    errors.travel = 'Travel field is required';
  }

  if (Validator.isEmpty(data.camp)) {
    errors.camp = 'Camp field is required';
  }

  if (Validator.equals(data.camp, '0')) {
    errors.camp = 'Camp field is required';
  }

  if (Validator.isEmpty(data.climber)) {
    errors.climber = 'Climb field is required';
  }

  if (Validator.equals(data.climber, '0')) {
    errors.climber = 'Climb field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
