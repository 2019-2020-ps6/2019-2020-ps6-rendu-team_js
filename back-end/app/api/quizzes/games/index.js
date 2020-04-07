const {Router} = require('express')
const logger = require('../../../utils/logger.js')
const {Result} = require("../../../models");
const {verifyIfAnswerIsCorrect} = require("../../users/statistiques/manager");
const {getCorrectAnswer} = require("../../users/statistiques/manager");
const {updateStatistics} = require("../result/manager");
const {Game, Quiz} = require("../../../models");

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
    try {
        res.status(200).json('GET HTTP method on user resource :)')
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:userId', (req, res) => {
    try {
        const games = Game.getGameById(req.params.userId);
        const quizArray = [];

        games.forEach((game) => {
            const quiz = Quiz.getById(game.quizId);
            quizArray.push(quiz);
        });

        res.status(200).json(quizArray)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.get('/:userId/:quizId', (req, res) => {
    try {
        const game = Game.getGameByIdAndQuiz(req.params.userId, req.params.quizId);

        res.status(200).json(game)
    } catch (err) {
        res.status(404).json(err)
    }
})

router.put('/', (req, res) => {
    try {
        const game = Game.getGameByIdAndQuiz(req.body.userId, req.body.quizId);

        if (game) {

            const date = game.date;
            const dateStartQuestion = req.body.date;
            const playTime = game.playTime + (Date.now() - dateStartQuestion);
            const quizId = req.body.quizId;
            const userId = req.body.userId;
            const answers = game.answers;
            answers.push(req.body.answer);

            const result = Game.updateGame(req.body.userId, req.body.quizId, {date, playTime, quizId, userId, answers});
            logger.info(result);
            res.status(200).json(result)

        } else { //undefined
            const date = req.body.date;
            const playTime = Date.now() - date;
            const quizId = req.body.quizId;
            const userId = req.body.userId;
            const answers = [];
            answers.push(req.body.answer);

            const result = Game.createGame({date, playTime, quizId, userId, answers});
            res.status(200).json(result)
        }

    } catch (err) {
        res.status(404).json(err)
    }
})


router.put('/quizCompleted', (req, res) => {
    try {
        const game = Game.getGameByIdAndQuiz(req.body.userId, req.body.quizId);

        if (game) {

            let date = game.date;
            let dateStartQuestion = req.body.date;
            let playTime = game.playTime + (Date.now() - dateStartQuestion);
            let quizId = req.body.quizId;
            let userId = req.body.userId;
            let answers = game.answers;
            answers.push(req.body.answer);

            const userAnswers = Game.updateGame(req.body.userId, req.body.quizId, {
                date,
                playTime,
                quizId,
                userId,
                answers
            });

            const goodAnswerScore = 100

            // Récupeter la liste des answers
            quizId = userAnswers.quizId;
            answers = userAnswers.answers;
            playTime = userAnswers.playTime;
            date = userAnswers.date;
            userId = userAnswers.userId;

            // Traitement & calcul du score
            // Pour chaque answer on va check si la reponse est juste et calculer les scores
            let correctAnswers = 0
            let totalAnswers = 0

            answers.forEach((answer) => {
                totalAnswers += 1
                if (verifyIfAnswerIsCorrect(answer.answerId)) {
                    correctAnswers += 1
                    answer.questionScore = goodAnswerScore
                } else {
                    const correctAnswer = getCorrectAnswer(answer.questionId)
                    answer.correctAnswerId = correctAnswer
                    answer.questionScore = goodAnswerScore / 2
                }
            })
            const maxScore = totalAnswers * goodAnswerScore;
            let userScore = correctAnswers * goodAnswerScore;
            userScore += ((maxScore - userScore) / 2);

            const quizSuccessPercentage = (100 * correctAnswers) / totalAnswers;

            // Création & save de l'objet Result
            const result = Result.create({
                ...userAnswers, maxScore, userId, userScore, quizSuccessPercentage
            });

            // Mise a jour des statistiques
            updateStatistics(userId, result.id, quizSuccessPercentage);

            Game.deleteGame(userId, quizId);

            res.status(201).json(result.id)
        }

    } catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router


/*

{
    "quizId" : "15850398739912",
    "answer":
      {
        "questionId": 1585040516920,
        "answerId": 1585040516926
      },
    "date" : 1585225306248, //Date start the question
    "userId" : 10000034
}


 */
