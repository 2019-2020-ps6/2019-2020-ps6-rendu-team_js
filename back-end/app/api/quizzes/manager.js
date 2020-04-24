const logger = require("../../utils/logger");
const {Quiz} = require('../../models')
const {filterQuestionsFromQuizz} = require('./questions/manager')
const {filterAnswersFromQuestion} = require('./questions/answers/manager')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizToPlay = (quizId) => {
    const quiz = Quiz.getById(quizId)
    const questions = filterQuestionsFromQuizz(quiz.id)
    const questionWithAnswers = questions.map((question) => {
        const answersList = filterAnswersFromQuestion(question.id)

        let answers = [];
logger.info('8888')
        if (answersList.length > 4) {
            answersList.forEach((answer) => {
                if (answer.isCorrect) {
                    answers.push(answer);

                    answersList.splice(answersList.indexOf(answer), 1);
                }
            });

            for (let i = 0; i < 3; i++) {
                const rand = getRandomInt(answersList.length)
                if (!answersList[rand].isCorrect) {
                    answers.push(answersList[rand]);
                    answersList.splice(answersList.indexOf(answersList[rand]), 1);
                }
            }
        }else {
            answers = answersList;
        }

        answers = shuffle(answers);

        return {...question, answers}
    })
    return {...quiz, questions: questionWithAnswers}
}


const buildQuizz = (quizId) => {
    const quiz = Quiz.getById(quizId)
    const questions = filterQuestionsFromQuizz(quiz.id)
    const questionWithAnswers = questions.map((question) => {
        const answers = filterAnswersFromQuestion(question.id)
        return {...question, answers}
    })
    return {...quiz, questions: questionWithAnswers}
}


const buildQuizNbQuestions = (quizList) => {

    let quiz = quizList.map((quiz) => {
        const questions = filterQuestionsFromQuizz(quiz.id)
        return {...quiz, nbQuestions: questions.length}
    })

    return quiz;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizzes = () => {
    const quizzes = Quiz.get()
    return quizzes.map((quiz) => buildQuizz(quiz.id))
}

module.exports = {
    buildQuizz,
    buildQuizzes,
    buildQuizNbQuestions,
    buildQuizToPlay,
}
