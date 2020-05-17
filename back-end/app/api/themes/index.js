const {Router} = require('express');
const manageAllErrors = require('../../utils/routes/error-management');
const {getCorrectFormatString} = require('../users/manager');
const {Theme} = require('../../models');
const router = new Router();


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

router.put('/edit/:themeId', (req, res) => {
    try {
        const theme = Theme.getById(req.params.themeId);
        theme.name = req.body.name;
        theme.color = req.body.color;

        const updatedTheme = Theme.update(req.params.themeId, theme);
        res.status(200).json(updatedTheme)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.delete('/:themeId', (req, res) => {
    try {
        Theme.delete(req.params.themeId);
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
});

module.exports = router;
