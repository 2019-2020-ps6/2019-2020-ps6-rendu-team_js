const {Router} = require('express')
const session = require('express-session')
const {User} = require('../../models')
const {isFirstAndLastNameExist, getCorrectFormatString, getUserByUsername} = require('./manager')
const manageAllErrors = require('../../utils/routes/error-management')
const cors = require('cors')
const {createSettings} = require('../users/settings/manager')

const router = new Router()
const bcrypt = require('bcrypt')
//                     1 sec  min  hr   day
const SESSION_LIFETIME = 1000 * 60 * 60 * 24 * 7
const SESSION_NAME = 'sid'
const SESSION_SECRET = 'wefaefwdgrv' /* generate a better one */

const ERROR_NAME = 'error';

router.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


const isAuth = (req) => {
    return req.session.userId !== undefined;
};

router.use(session({
    name: SESSION_NAME,
    // don't modify the session if never modified
    resave: false,
    // don't save any empty sessions
    saveUninitialized: true,
    // secret used to signed the cookie
    secret: SESSION_SECRET,

    // http only cookie
    cookie: {
        maxAge: SESSION_LIFETIME,
        // CHANGE TO TRUE WHEN IN PROD
        secure: false,
        // allow to get it from the same domain site
        sameSite: true,
    },
}));

router.get('/residents', (req, res) => {

    try {
        res.status(200).json(User.get()
            .filter((u) => u.accountLevel === 0)
            .sort(function (a, b) {
                if(a.lastName.toLowerCase() < b.lastName.toLowerCase()) { return -1; }
                if(a.lastName.toLowerCase() > b.lastName.toLowerCase()) { return 1; }
                return 0;
            }));
    } catch (err) {
        manageAllErrors(res, err)
    }
});


router.post('/', async (req, res) => {

    try {
        console.log(req.body);

        firstName = getCorrectFormatString(req.body.firstName);
        lastName = getCorrectFormatString(req.body.lastName);
        assistanceMoteur = req.body.assistanceMoteur;
        assistanceVisuelle = req.body.assistanceVisuelle;

        if (firstName === undefined || lastName === undefined) {
            return res.status(200).json({'errors': 'Nom ou prénom indéfini'})
        }

        alreadyExist = isFirstAndLastNameExist(firstName, lastName);
        console.log(alreadyExist);
        if (alreadyExist) {
            return res.status(200).json({'errors': 'Ce nom et prénom existe déjà'})
        }


        console.log('visu : ' + assistanceVisuelle + '        mot : ' + assistanceMoteur);

        const tempUser = {...req.body};
        delete tempUser.assistanceMoteur;
        delete tempUser.assistanceVisuelle;
        tempUser.firstName = firstName;
        tempUser.lastName = lastName;
        tempUser.username = firstName + ' ' + lastName;
        tempUser.password = await bcrypt.hash(req.body.password, 10);

        console.log(tempUser);
        let user = User.create(tempUser);
        // User.save();

        createSettings(user.id, assistanceVisuelle, assistanceMoteur);

        res.status(201).json({'errors': ''}) // no errors

    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/login', async (req, res) => {

    try {
        const user = getUserByUsername(req.body.username);
        console.log(req.body.username);

        if (user === undefined) {
            return res.status(200).json({'errors': 'L\'utilisateur n\'existe pas'})
        }

        // use bcrypt.compare() to present timing attack
        // (it's when you analyse the time taken to decrypt the password)
        if (await bcrypt.compare(req.body.password, user.password)) {
            console.log('User logged in : ' + req.body.username);
            req.session.userId = user.id;
            return res.status(200).json(user)
        } else {
            return res.status(200).json({'errors': 'Mot de passe incorrect'})
        }

    } catch (err) {
        manageAllErrors(res, err)
    }
});


router.get('/login', (req, res) => {

    try {
        console.log(req.session.userId);
        if (req.session.userId !== undefined) {
            const user = User.getById(req.session.userId);
            console.log(user);
            return res.status(200).json(user);
        }

        if (req.body.username !== undefined) {

            const user = getUserByUsername(req.body.username);
            console.log(user);
            return res.status(200).json(user);
        }

        return res.status(200).json({}); // if not found return empty object


    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/logout', (req, res) => {
    try {

        req.session.destroy(err => {
            if (err) {
                return res.status(200).json({'success': false})
            }

            res.clearCookie(SESSION_NAME);
            console.log('A user has logged out');
            return res.status(200).json({'success': true})
        })

    } catch (err) {
        manageAllErrors(res, err)
    }
});


// router.put('/:userId', (req, res) => {
//     try {
//         const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
//         const updatedQuestion = Question.update(req.params.questionId, { label: req.body.label, quizId: question.quizId })
//         res.status(200).json(updatedQuestion)
//     } catch (err) {
//         manageAllErrors(res, err)
//     }
// })

router.delete('/:userId', (req, res) => {
    try {
        // Check if the user id exists & if the user has the same userId as the one provided in the url.
        const user = User.getById(req.params.userId);

        if (user !== undefined) {
            User.delete(req.params.userId);
            return res.status(204).end();
        }

        return res.status(404).end();
    } catch (err) {
        manageAllErrors(res, err)
    }
});


module.exports = router;
