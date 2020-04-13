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

const copySettings = (userSharingSetting, usersID) => {

    let userSettings = Settings.getById(userSharingSetting);

    console.log('user id to copy settings on : ' + userSharingSetting);
    console.log(usersID);

    usersID.forEach((uid) => {
        console.log(uid);
        let newSettings  = Settings.getById(uid);
        console.log(newSettings);
        newSettings.handicapVisuel = userSettings.handicapVisuel;
        newSettings.handicapMoteur = userSettings.handicapMoteur;
        newSettings.contraste = userSettings.contraste;
        newSettings.fontSize = userSettings.fontSize;
        newSettings.font = userSettings.font;
        newSettings.tailleSelection = userSettings.tailleSelection;
        console.log(newSettings);

        Settings.update(uid, newSettings);
    })
};

module.exports = {
    createSettings,
    resetSettings,
    copySettings,
};


/* JSON ATTENDU EN ENTREE POUR LE PUT
 {
    "handicapVisuel" : true,
    "handicapMoteur" : false,
    "contraste" : 1,
    "fontSize" : 2,
    "font" : "Segoe UI",
    "tailleSelection" : 1
}
 */
