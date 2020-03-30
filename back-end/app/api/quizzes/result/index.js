const { Router } = require('express')
const { Result, Statistics } = require('../../../models')
const logger = require('../../../utils/logger.js')
const { verifyIfAnswerIsCorrect, getCorrectAnswer, buildResult, updateStatistics } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json('GET HTTP method on user resource')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:resultId', (req, res) => {
  try {
    const result = buildResult(req.params.resultId)
    // const result = Result.getById(req.params.resultId)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  const goodAnswerScore = 100

  try {
    // Récupeter la liste des answers
    const quizId = req.body.quizId;
    const answers = req.body.answers;
    const playTime = req.body.playTime;
    const date = req.body.date;
    const userId = req.body.userId;

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
      ...req.body, maxScore, userId, userScore, quizSuccessPercentage
    });

    // Mise a jour des statistiques
    updateStatistics(userId, result.id, quizSuccessPercentage);

    res.status(201).json(result.id)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
