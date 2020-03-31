const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const ResultRouter = require('./quizzes/result')
const StatsRouter = require('./users/statistiques')
const SettingsRouter = require('./users/settings')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/result', ResultRouter)
router.use('/statistics', StatsRouter)
router.use('/settings', SettingsRouter)

module.exports = router
