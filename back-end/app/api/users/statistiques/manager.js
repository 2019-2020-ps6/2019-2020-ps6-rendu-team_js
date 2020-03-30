const { Answer, Statistics, Quiz } = require('../../../models')
const { buildResult } = require('../../quizzes/result/manager')
const logger = require('../../../utils/logger.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const buildStats = (statsId) => {
    const stats = Statistics.getStatisticById(statsId);

    const mapOfQuiz = new Map();

    stats.quizzesResultIds.forEach((quizResultId) => {
        const quizResult = buildResult(quizResultId);

        const quizId = quizResult.quiz.id;

        if (mapOfQuiz.has(quizId)){ // Existe dans la map
            let array = mapOfQuiz.get(quizId);
            const result = {};
            result.date = quizResult.date;
            result.quizResultId = quizResultId;
            result.quizSuccessPercentage = quizResult.quizSuccessPercentage;
            array.push(result)
        }else { // Existe pas dans la map
            const array = [];
            const result = {};
            result.date = quizResult.date;
            result.quizResultId = quizResultId;
            result.quizSuccessPercentage = quizResult.quizSuccessPercentage;
            array.push(result);
            mapOfQuiz.set(quizId , array);
        }
    });

    let quizzesResultIds = [];

    for (let key of mapOfQuiz.keys()) {

        const quizInfo  = Quiz.getById(key);
        quizInfo.quizTries = mapOfQuiz.get(key);
        quizzesResultIds.push(quizInfo);
    }


    return { ...stats, quizzesResultIds }
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
