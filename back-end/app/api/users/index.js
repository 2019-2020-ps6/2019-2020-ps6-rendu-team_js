const { Router } = require('express')
const session = require('express-session')
const { User } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const cors = require('cors')

const router = new Router()
const bcrypt = require('bcrypt')
//                     1 sec  min  hr   day
const SESSION_LIFETIME = 1000 * 60 * 60 * 24 * 7
const SESSION_NAME = 'sid'
const SESSION_SECRET = 'wefaefwdgrv' /* generate a better one */

// const EMPTY_USER = {
//   username: '',
//   firstName: '',
//   lastName: '',
//   password: '',
//   accountLevel: -1,
// };


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
}

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
}))

router.get('/', (req, res) => {

  try {
    const { userId } = req.session
    // const { userSession } = req.session
    console.log(isAuth())
    res.status(200).json(User.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})



router.post('/', async (req, res) => {

  try {
    if (isAuth(req)) {
      return res.status(400).send('User is already authenticated')
    }

    let user = User.create({ ...req.body })
    req.session.userId = user.id
    user.password = await bcrypt.hash(req.body.password, 10)
    User.save();
    res.status(201).json(user)

  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/login', async (req, res) => {

  try {
    const user = User.items.find((u) => u.username === req.body.username)
    console.log(req.body.username)

    if (user === undefined) {
      return res.status(200).json({'information': 'user doesn\'t exist'})
    }



    // use bcrypt.compare() to present timing attack
    // (it's when you analyse the time taken to decrypt the password)
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log(user)
      req.session.userId = user.id
      return res.status(200).json(user)
    } else {
      return res.status(200).json({'information': 'wrong password'})
    }

  } catch (err) {
    manageAllErrors(res, err)
  }
})


router.get('/login', (req, res) => {

  try {
    console.log(req.session.userId)
    if(req.session.userId !== undefined){
      const user = User.getById(req.session.userId );
      console.log(user)
      return res.status(200).json(user);
    }

    const user = User.items.find((u) => u.username === req.body.username);
    console.log(user)
    return res.status(200).json(user);

  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/logout', (req, res) => {
  try {

    req.session.destroy(err => {
      if (err) {
        return res.status(200).json({'success': false})
      }

      res.clearCookie(SESSION_NAME)
      return res.status(200).json({'success': true})
    })

  } catch (err) {
    manageAllErrors(res, err)
  }
})



module.exports = router
