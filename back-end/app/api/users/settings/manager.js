const { Settings, Statistics, Quiz } = require('../../../models')
const { buildResult } = require('../../quizzes/result/manager')
const logger = require('../../../utils/logger.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

const createSettings = (userId, handicapVisuel, handicapMoteur) => {

    let contraste = 1; // Normal
    let fontSize = 1;  // Normal
    let font = 'Segoe UI';
    let tailleSelection = 1; // Normal

    if(handicapVisuel){  // Handicap Visuel
        contraste = 2; // Grand
        fontSize = 2;  // Grand
    }

    if(handicapMoteur){  // Handicap Moteur
        tailleSelection = 2; //Grand
    }

    Settings.createWithId(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, tailleSelection})
};

const resetSettings = (userId, handicapVisuel, handicapMoteur) => {

    let contraste = 1; // Normal
    let fontSize = 1;  // Normal
    let font = 'Segoe UI';
    let tailleSelection = 1; // Normal

    if(handicapVisuel){  // Handicap Visuel
        contraste = 2; // Grand
        fontSize = 2;  // Grand
    }

    if(handicapMoteur){  // Handicap Moteur
        tailleSelection = 2; //Grand
    }

    Settings.update(userId, { handicapVisuel, handicapMoteur, contraste, fontSize, font, tailleSelection})
};

module.exports = {
    createSettings,
    resetSettings,
};
