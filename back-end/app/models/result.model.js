const Joi = require('joi')
const CheckModel = require('../utils/check-model.js')

module.exports = new CheckModel('Result', {
  userScore: Joi.number().required(),
  maxScore: Joi.number().required(),
  playTime: Joi.number().required(),
  date: Joi.number().required(),
  quizId: Joi.string().required(),
  answers: Joi.array().required(),
  userId: Joi.string().required(),
})
