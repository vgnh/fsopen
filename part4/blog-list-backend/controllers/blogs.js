const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = request.user // middleware

  if(!user) {
    return response.status(401).json({
      error: 'Unauthorized. Token not provided.'
    })
  }

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
  const user = request.user // middleware

  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete.user.toString() === user.id) {
    await Blog.findByIdAndRemove(blogToDelete.id)

    user.blogs = user.blogs.filter(id => id.toString() !== blogToDelete.id)
    await user.save()

    response.status(204).end()
  }
  else {
    response.status(405).json({
      error: 'Blog cannot be deleted by a different user'
    })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const user = request.user

  const oldBlog = await Blog.findById(request.params.id)
  if (oldBlog.user.toString() === user.id) {
    const newBlog = {
      title: body.title ? body.title : oldBlog.title,
      author: body.author ? body.author : oldBlog.author,
      url: body.url ? body.url : oldBlog.url,
      likes: body.likes ? body.likes : oldBlog.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true })
    response.status(200).json(updatedBlog)
  }
  else {
    response.status(405).json({
      error: 'Blog cannot be chnaged by a different user'
    })
  }
})

module.exports = blogsRouter