const { Router } = require('express')
const logger = require('../../../utils/logger.js')
const {Settings} = require("../../../models");
const { resetSettings } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json('GET HTTP method on user resource :)')
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:residentId', (req, res) => {
  try {
    const settings = Settings.getById(req.params.residentId);

    res.status(200).json(settings)
  } catch (err) {
    res.status(404).json(err)
  }
});

router.put('/:residentId', (req, res) => {
  try {
    const result = Settings.update(req.params.residentId, req.body);

    res.status(200).json(result)
  } catch (err) {
    res.status(404).json(err)
  }
});

router.put('/resetSettings/:residentId', (req, res) => {
  try {
    const result = resetSettings(req.params.residentId, req.body.handicapVisuel, req.body.handicapMoteur);

    res.status(200).json(result)
  } catch (err) {
    res.status(404).json(err)
  }
});

module.exports = router


/*
 //JSON ATTENDU EN ENTREE POUR LE PUT
 {
    "handicapVisuel" : true,
    "handicapMoteur" : false,
    "contraste" : 1,
    "fontSize" : 2,
    "font" : "Segoe UI",
    "tailleSelection" : 1
}

 */
