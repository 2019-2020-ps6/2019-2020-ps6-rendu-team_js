const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  themeId: Joi.string().required(),
  name: Joi.string().required(),
  difficulty: Joi.string().required(),
})
