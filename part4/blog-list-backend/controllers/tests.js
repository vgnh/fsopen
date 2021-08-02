const testsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

testsRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testsRouter