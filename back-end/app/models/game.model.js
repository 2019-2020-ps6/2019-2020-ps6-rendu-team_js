const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Game', {
  playTime: Joi.number().required(),
  date: Joi.number().required(),
  quizId: Joi.string().required(),
  answers: Joi.array().required(),
  userId: Joi.number().required(),
})
