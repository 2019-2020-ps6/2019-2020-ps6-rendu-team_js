const { Answer, Result, Question, Statistics, Quiz, Theme } = require('../../../models')
const logger = require('../../../utils/logger.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const buildResult = (resultId) => {
  const result = Result.getById(resultId);

  const quiz = Quiz.getById(result.quizId);
  const theme = Theme.getById(quiz.themeId);

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
    return { ...result, quiz, answers, theme }
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

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    // Return array of year and week number
    return weekNo
}

const updateStatistics = (userId, resultId, quizSuccessPercentage) => {

    // Methode qui check si la réponse choisi est la bonne
    const userStatistiques = Statistics.getStatisticById(userId);

    let perfectQuiz = 0;
    if (quizSuccessPercentage === 100){
        perfectQuiz = 1;
    }

    // const currentWeek = getWeekNumber(new Date())
    const currentWeek = getWeekNumber(new Date());
    if (userStatistiques) { // Statistics found
        perfectQuiz = perfectQuiz + userStatistiques.perfectQuiz;
        const totalQuizMade = userStatistiques.totalQuizMade + 1;
        const successPercentage = ((userStatistiques.successPercentage * userStatistiques.totalQuizMade) + quizSuccessPercentage) / totalQuizMade;
        let weekQuizMade = 1;
        if (userStatistiques.currentWeek === currentWeek) {
            weekQuizMade = userStatistiques.weekQuizMade + 1
        }
        let quizzesResultIds = userStatistiques.quizzesResultIds
        quizzesResultIds.push(resultId);

        // Statistics.update(userId, currentWeek, totalQuizMade, weekQuizMade, quizzesStats)
        Statistics.update(userId, { currentWeek, successPercentage, totalQuizMade, weekQuizMade, quizzesResultIds, perfectQuiz});
    } else { // Statistics undefined
        const successPercentage = quizSuccessPercentage;
        const totalQuizMade = 1;
        const weekQuizMade = 1;
        const quizzesResultIds = [];
        quizzesResultIds.push(resultId);
        // Statistics.createWithId(userId, currentWeek, totalQuizMade, weekQuizMade, quizzesStats)
        Statistics.createWithId(userId, { currentWeek, successPercentage, totalQuizMade, weekQuizMade, quizzesResultIds, perfectQuiz});
    }
}

module.exports = {
    verifyIfAnswerIsCorrect,
    filterAnswersFromQuestion,
    getCorrectAnswer,
    buildResult,
    updateStatistics,
}
