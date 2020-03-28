const { Answer, Statistics, Question } = require('../../../models')
const logger = require('../../../utils/logger.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const buildStats = (statsId) => {
    const stats = Statistics.getStatisticById(statsId)
    return stats
}


const filterAnswersFromQuestion = (questionId) => Answer.get().filter((answer) => (answer.questionId === questionId))

const verifyIfAnswerIsCorrect = (answerId) => {
    // Methode qui check si la réponse choisi est la bonne
    const answer = Answer.getById(answerId)
    return answer.isCorrect
}

const getCorrectAnswer = (questionId) => {
    // Methode qui doit chercher dans la liste des reponses a une question la réponse juste (refactor du json des questions)

    const answers = filterAnswersFromQuestion(questionId)
    // const answers = Answer.getByQuestionId(questionId)
    let correctAnswer = -1
    answers.forEach((answer) => {
        if (answer.isCorrect) {
            correctAnswer = answer.id
        }
    })
    return correctAnswer
}

module.exports = {
    verifyIfAnswerIsCorrect,
    filterAnswersFromQuestion,
    getCorrectAnswer,
    buildStats,
}
