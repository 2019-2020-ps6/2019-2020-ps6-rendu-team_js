const { Router } = require('express')
const { Result } = require('../../../models')
const logger = require('../../../utils/logger.js')
const { verifyIfAnswerIsCorrect, getCorrectAnswer, buildResult } = require('./manager')

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
    logger.info(result)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  const goodAnswerScore = 100
  const badAnswerScore = 50

  try {
    // Récupeter la liste des answers
    const { quizId } = req.body
    const { answers } = req.body
    const { playTime } = req.body
    const { date } = req.body
    const userId = '000000000'

    // Traitement & calcul du score
    // Pour chaque answer on va check si la reponse est juste et calculer les scores
    let userScore = 0
    let maxScore = 0

    answers.forEach((answer) => {
      if (verifyIfAnswerIsCorrect(answer.answerId)) {
        userScore += goodAnswerScore
        answer.questionScore = goodAnswerScore
      } else {
        userScore += badAnswerScore
        const correctAnswer = getCorrectAnswer(answer.questionId)
        answer.correctAnswerId = correctAnswer
        answer.questionScore = badAnswerScore
      }
      maxScore += goodAnswerScore
    })

    // Création & save de l'objet Result
    const result = Result.create({
      ...req.body, maxScore, userId, userScore,
    })
    res.status(201).json(result)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
