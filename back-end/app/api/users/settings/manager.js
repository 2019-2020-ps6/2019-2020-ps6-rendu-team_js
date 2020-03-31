const { Settings, Statistics, Quiz } = require('../../../models')
const { buildResult } = require('../../quizzes/result/manager')
const logger = require('../../../utils/logger.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const createSettings = (userId, handicapVisuel, handicapMoteur) => {

    if (handicapVisuel && !handicapMoteur){ //Visuel Uniquement
        const contraste = 2; //Grand
        const fontSize = 2; //Grand
        const font = 'Segoe UI';
        const tailleSelection = 1; //Normal (moyenne)
        Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, tailleSelection})

    } else if (handicapMoteur && !handicapVisuel){ // Moteur uniquement
        const contraste = 1; //Normal
        const fontSize = 1; //Normal
        const font = 'Segoe UI';
        const tailleSelection = 2; //Grand
        Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, tailleSelection})

    } else if (handicapMoteur && handicapVisuel) { // Visuel & Moteur
        const contraste = 2; //Grand
        const fontSize = 2; //Grand
        const font = 'Segoe UI';
        const tailleSelection = 2; //Grand
        Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, tailleSelection})

    } else { // No handicap
        const contraste = 1; //Normal
        const fontSize = 1; //Normal
        const font = 'Segoe UI';
        const tailleSelection = 1; //Normal
        Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, tailleSelection})

    }
};

module.exports = {
    createSettings,
};
