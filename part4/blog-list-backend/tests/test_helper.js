const Blog = require('../models/blog.js')

const initialBlogs = [
  {
    title: 'Something about Rust',
    author: 'Amos',
    url: 'https://fasterthanli.me',
    likes: 21
  },
  {
    title: 'Something awesome',
    author: 'Filip Hracek',
    url: 'https://selfimproving.dev',
    likes: 11
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'asdf',
    author: 'qwerty',
    url: 'https://zxcv.bn',
    likes: 1
  })
  await blog.save()
  await blog.remove()

  return blog.id
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}