const { Answer, Result, Question } = require('../../../models')
const logger = require('../../../utils/logger.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const buildResult = (resultId) => {
  const result = Result.getById(resultId)

  const answers = result.answers.map((answer) => {
        const questionScore = answer.questionScore
        const question = Question.getById(answer.questionId)
        const userAnswer = Answer.getById(answer.answerId)
        if (answer.correctAnswerId) {
            const correctAnswer = Answer.getById(answer.correctAnswerId)
            return { ...questionScore, question, userAnswer, correctAnswer, questionScore }
        } else {
            return { ...questionScore, question, userAnswer, questionScore }
        }
    })
    return { ...result, answers }
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
    buildResult,
}
