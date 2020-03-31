const {Router} = require('express')
const session = require('express-session')
const {User} = require('../../models')
const { isFirstAndLastNameExist } = require('./manager')
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
        res.status(200).json(User.get().filter((u) => u.accountLevel === 0));
    } catch (err) {
        manageAllErrors(res, err)
    }
});


router.post('/', async (req, res) => {

    try {
        console.log(req.body);

        firstName = req.body.firstName;
        lastName = req.body.lastName;
        assistanceMoteur = req.body.assistanceMoteur;
        assistanceVisuelle = req.body.assistanceVisuelle;

        if (firstName === undefined || lastName === undefined) {
            return res.status(200).json({'errors': 'Nom ou prénom indéfini'})
        }

        alreadyExist = isFirstAndLastNameExist(firstName, lastName);
        console.log(alreadyExist);
        if(alreadyExist){
            return res.status(200).json({'errors': 'Ce nom et prénom existe déjà'})
        }


        console.log('visu : ' + assistanceVisuelle + '        mot : ' + assistanceMoteur );

        const tempUser = { ...req.body};
        delete tempUser.assistanceMoteur;
        delete tempUser.assistanceVisuelle;

        console.log(tempUser);

        let user = User.create(tempUser);
        user.password = await bcrypt.hash(req.body.password, 10);
        User.save();

        createSettings(user.id, assistanceVisuelle, assistanceMoteur);

        res.status(201).json({'errors': ''}) // no errors

    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/login', async (req, res) => {

    try {
        const user = User.items.find((u) => u.username === req.body.username);
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

        const user = User.items.find((u) => u.username === req.body.username);
        console.log(user);
        return res.status(200).json(user);

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




module.exports = router;
