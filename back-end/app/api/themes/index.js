const {Router} = require('express');
const manageAllErrors = require('../../utils/routes/error-management');
const {getCorrectFormatString} = require('../users/manager');
const {Theme} = require('../../models');
const router = new Router();


// // Add headers
// router.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });

router.get('/', (req, res) => {
    try {
        console.log("get theme");
        res.status(200).json(Theme.get());
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:themeId', (req, res) => {
    try {
        const theme = Theme.getById(req.params.themeId);
        res.status(200).json(theme);
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {

        let isThemeAlreadyExist = false;
        console.log(req.body);
        Theme.get().forEach((t) => {
            if(req.body.name === t.name) {
                isThemeAlreadyExist = true;
            }
        });

        if (isThemeAlreadyExist) {
            return res.status(409).json({'errors': 'Le thème existe déjà'});
        }


        const theme = Theme.create({...req.body});
        theme.name = getCorrectFormatString(theme.name);

        return res.status(201).json(theme);

    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:themeId', (req, res) => {
    try {
        const theme = Theme.getById(req.params.themeId);
        const updatedTheme = Theme.update(req.params.themeId, {nbQuiz: req.params.nbQuiz});
        res.status(200).json(updatedTheme)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

module.exports = router;
