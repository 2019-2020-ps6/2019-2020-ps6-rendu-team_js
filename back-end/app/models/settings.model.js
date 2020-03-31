const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Settings', {
  handicapVisuel: Joi.boolean().required(),
  handicapMoteur: Joi.boolean().required(),
  contraste: Joi.number().required(),
  fontSize: Joi.number().required(),
  font: Joi.string().required(),
  tailleSelection: Joi.number().required(),
})
