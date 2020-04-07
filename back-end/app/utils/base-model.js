/* eslint-disable no-param-reassign */
const fs = require('fs')
const Joi = require('joi')
const logger = require('../utils/logger.js')
const ValidationError = require('./errors/validation-error.js')
const NotFoundError = require('./errors/not-found-error.js')

module.exports = class BaseModel {
  constructor(name, schema) {
    if (!name) throw new Error('You must provide a name in constructor of BaseModel')
    if (!schema) throw new Error('You must provide a schema in constructor of BaseModel')
    this.schema = Joi.object().keys({ ...schema, id: Joi.number() })
    this.items = []
    this.name = name
    this.filePath = `${__dirname}/../../mocks/${this.name.toLowerCase()}.mocks.json`
    this.load()
  }

  load() {
    try {
      this.items = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
    } catch (err) {
      if (err.message === 'Unexpected end of JSON input') logger.log(`Warning : ${this.filePath} has wrong JSON format`)
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.items, null, 2), 'utf8')
    } catch (err) {
      logger.log(`Error while trying to save ${this.name}`)
    }
  }

  get() {
    return this.items
  }

  getById(id) {
    if (typeof id === 'string') id = parseInt(id, 10)
    const item = this.items.find((i) => i.id === id)
    if (!item) throw new NotFoundError(`Cannot get ${this.name} id=${id} : not found`)
    return item
  }

  getGameByIdAndQuiz(userId, quizId) {
    if (typeof userId === 'string') userId = parseInt(userId, 10)
    const items = this.items.filter((i) => i.userId === userId)
    let item;
    if (items) {
        item = items.find((i) => i.quizId === quizId)
    }
    //if (!item) throw new NotFoundError(`Cannot get ${this.name} userId=${userId} and quizId=${quizId} : not found`)
    return item
  }

  getGameById(userId) {
    if (typeof userId === 'string') userId = parseInt(userId, 10)
    const item = this.items.filter((i) => i.userId === userId)
    //if (!item) throw new NotFoundError(`Cannot get ${this.name} userId=${userId} and quizId=${quizId} : not found`)
    return item
  }

  getStatisticById(userId) {
    if (typeof userId === 'string') userId = parseInt(userId, 10)
    const item = this.items.find((i) => i.id === userId)
    //if (!item) throw new NotFoundError(`Cannot get ${this.name} id=${userId} : not found`)
    return item
  }

  create(obj = {}) {
    const item = { ...obj, id: Date.now() }
    console.log(item)
    const { error } = Joi.validate(item, this.schema)
    if (error) throw new ValidationError(`Create Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error)
    this.items.push(item)
    this.save()
    return item
  }

  createGame(obj = {}) {
    const item = { ...obj}
    const { error } = Joi.validate(item, this.schema)
    if (error) throw new ValidationError(`Create Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error)
    this.items.push(item)
    this.save()
    return item
  }

  createWithId(idValue, obj = {}) {
    const item = { ...obj, id: idValue }
    const { error } = Joi.validate(item, this.schema)
    if (error) throw new ValidationError(`Create Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error)
    this.items.push(item)
    this.save()
    return item
  }

  update(id, obj) {
    if (typeof id === 'string') id = parseInt(id, 10)
    const prevObjIndex = this.items.findIndex((item) => item.id === id)
    if (prevObjIndex === -1) throw new NotFoundError(`Cannot update ${this.name} id=${id} : not found`)
    const updatedItem = { ...this.items[prevObjIndex], ...obj }
    const { error } = Joi.validate(updatedItem, this.schema)
    if (error) throw new ValidationError(`Update Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error)
    this.items[prevObjIndex] = updatedItem
    this.save()
    return updatedItem
  }

  updateGame(userId, quizId, obj) {

    if (typeof userId === 'string') userId = parseInt(userId, 10)
    const items = this.items.filter((item) => item.userId === userId)

    const prevObjIndex = items.findIndex((item) => item.quizId === quizId)

    if (prevObjIndex === -1) throw new NotFoundError(`Cannot update ${this.name} userId=${userId} and quizId=${quizId} : not found`)
    const updatedItem = { ...this.items[prevObjIndex], ...obj }
    const { error } = Joi.validate(updatedItem, this.schema)
    if (error) throw new ValidationError(`Update Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error)
    this.items[prevObjIndex] = updatedItem
    this.save()
    return updatedItem
  }

  delete(id) {
    if (typeof id === 'string') id = parseInt(id, 10)
    const objIndex = this.items.findIndex((item) => item.id === id)
    if (objIndex === -1) throw new NotFoundError(`Cannot delete ${this.name} id=${id} : not found`)
    this.items = this.items.filter((item) => item.id !== id)
    this.save()
  }

  deleteGame(userId, quizId) {
    if (typeof userId === 'string') userId = parseInt(userId, 10)
    const items = this.items.filter((item) => item.userId === userId)
    const objIndex = items.findIndex((item) => item.quizId === quizId)

    if (objIndex === -1) throw new NotFoundError(`Cannot delete ${this.name} userId=${userId} and quizId=${quizId}  : not found`)
    this.items = this.items.filter((item) => item.userId !== userId)
    this.save()
  }
}
