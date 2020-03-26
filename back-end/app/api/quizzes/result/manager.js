const { Answer } = require('../../../models')
const logger = require('../../../utils/logger.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const filterAnswersFromQuestion = (questionId) => Answer.get().filter((answer) => (answer.questionId === questionId))

const verifyIfAnswerIsCorrect = (answerId) => {
  // Methode qui check si la réponse choisi est la bonne
  const answer = Answer.getById(answerId)
  return answer.isCorrect
}

const getResult = (quizId, questionId) => {
  // Check if quizId exists, if not it will throw a NotFoundError
  const quiz = Quiz.getById(quizId)
  const quizIdInt = parseInt(quizId, 10)
  const question = Question.getById(questionId)
  if (question.quizId !== quizIdInt) throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id} : not found`)
  return question
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
}
