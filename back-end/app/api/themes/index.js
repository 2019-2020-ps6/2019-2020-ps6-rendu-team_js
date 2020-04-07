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


router.post('/', (req, res) => {
    console.log("hello");
    try {
        const theme = Theme.create({ ...req.body })
        res.status(201).json(theme)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router;
