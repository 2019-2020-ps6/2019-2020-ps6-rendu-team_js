const { Router } = require('express');
const QuizzesRouter = require('./quizzes');
const UserRouter = require('./users');
const ResultRouter = require('./quizzes/result');
const StatsRouter = require('./users/statistiques');
const SettingsRouter = require('./users/settings');
const ThemeRouter = require('./themes');
const GamesRouter = require('./quizzes/games');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/quizzes', QuizzesRouter);
router.use('/users', UserRouter);
router.use('/result', ResultRouter);
router.use('/statistics', StatsRouter);
router.use('/settings', SettingsRouter);
router.use('/theme', ThemeRouter);
router.use('/games', GamesRouter);

// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

module.exports = router;
