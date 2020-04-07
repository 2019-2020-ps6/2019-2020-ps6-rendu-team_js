const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Theme', {
  name: Joi.string().required(),
  nbQuiz: Joi.number().required(),
  color: Joi.string().required(),
});
