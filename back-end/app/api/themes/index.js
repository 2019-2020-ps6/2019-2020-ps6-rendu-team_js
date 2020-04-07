const {Router} = require('express');
const manageAllErrors = require('../../utils/routes/error-management');
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
        const theme = Theme.create({ ...req.body })
        res.status(201).json(theme)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:themeId', (req, res) => {
    try {
        const theme = Theme.getById(req.params.themeId);
        const updatedTheme = Theme.update(req.params.themeId, { nbQuiz: req.params.nbQuiz});
        res.status(200).json(updatedTheme)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router;
