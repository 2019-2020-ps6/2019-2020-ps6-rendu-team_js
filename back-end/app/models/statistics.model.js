const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Statistics', {
  totalQuizMade: Joi.number().required(),
  currentWeek: Joi.number().required(),
  weekQuizMade: Joi.number().required(),
  successPercentage: Joi.number().required(),
  perfectQuiz: Joi.number().required(),
  quizzesResultIds: Joi.array().required(),
})
