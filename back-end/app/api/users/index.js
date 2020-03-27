const { Router } = require('express')

const { User } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(User.getById(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', async (req, res) => {
  try {
    const user = User.create({ ...req.body })
    user.password = await bcrypt.hash(req.body.password, 10)
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = User.items.find((u) => u.firstName === req.body.firstName && u.lastName === req.body.lastName)

    console.log(user)

    if (user == null) {
      res.status(400).send('Cannot find user')
    }

    // use bcrypt.compare() to present timing attack
    // (it's when you analyse the time taken to decrypt the password)
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json(user)
    } else {
      res.status(400).send('Wrong password')
    }
  } catch (err) {
    manageAllErrors(res, err)
  }
})


router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    User.delete(req.params.userId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
