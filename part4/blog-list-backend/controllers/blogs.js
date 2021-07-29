const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findOne({username: 'hellas'})

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })
  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const oldBlog = await Blog.findById(request.params.id)
  const newBlog = {
    title: body.title ? body.title : oldBlog.title,
    author: body.author ? body.author : oldBlog.author,
    url: body.url ? body.url : oldBlog.url,
    likes: body.likes ? body.likes : oldBlog.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter