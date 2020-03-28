const { Router } = require('express')
const logger = require('../../../utils/logger.js')
const { buildStats } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json('GET HTTP method on user resource')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    const result = buildStats(req.params.userId)
    // const result = Result.getById(req.params.resultId)
    logger.info(result)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
