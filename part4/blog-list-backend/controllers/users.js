const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user.js')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response.status(400).json({
      error: 'User validation failed: password: Error, `password` missing or doesn\'t match minimum length.'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter