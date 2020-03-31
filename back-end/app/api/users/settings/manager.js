const { Settings, Statistics, Quiz } = require('../../../models')
const { buildResult } = require('../../quizzes/result/manager')
const logger = require('../../../utils/logger.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const buildSettings = (statsId) => {
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
};


const createSettings = (userId, handicapVisuel, handicapMoteur) => {

    if (handicapVisuel && !handicapMoteur){ //Visuel Uniquement
        const contraste = 2; //Grand
        const fontSize = 2; //Grand
        const font = 'Segoe UI';
        const TailleSelection = 1; //Normal (moyenne)
        Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, TailleSelection})

    } else if (handicapMoteur && !handicapVisuel){ // Moteur uniquement
        const contraste = 1; //Normal
        const fontSize = 1; //Normal
        const font = 'Segoe UI';
        const TailleSelection = 2; //Grand
        Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, TailleSelection})

    } else if (handicapMoteur && handicapVisuel) { // Visuel & Moteur
        const contraste = 2; //Grand
        const fontSize = 2; //Grand
        const font = 'Segoe UI';
        const TailleSelection = 2; //Grand
        Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, TailleSelection})

    } else { // No handicap
        const contraste = 1; //Normal
        const fontSize = 1; //Normal
        const font = 'Segoe UI';
        const TailleSelection = 1; //Normal
        Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, TailleSelection})

    }
};

module.exports = {
    createSettings,
    buildSettings,
};
