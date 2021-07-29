const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_api_helper.js')
const user_helper = require('./user_api_helper.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const app = require('../app.js')
const jwt = require('jsonwebtoken')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  /* const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray) */
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  await User.insertMany(user_helper.initialUsers)
})

const tokenFun = async () => {
  const user = await User.findOne({ username: 'hellas' })
  const userForToken = {
    username: user.username,
    id: user.id
  }
  return jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
}

describe('when there is initially some blogs saved', () => {
  test('correct number of blog posts', async () => {
    const response = await api.get('/api/blogs').set('authorization', `bearer ${await tokenFun()}`)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs').set('authorization', `bearer ${await tokenFun()}`)
    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of new blog', () => {
  test('HTTP POST creates a new blog post', async () => {
    const newBlog = {
      title: 'Third blog',
      author: 'Jest test',
      url: 'http://localhost:PORT',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${await tokenFun()}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAfterPost.map(blog => blog.title)
    expect(titles).toContain('Third blog')
  })

  test('likes defaults to 0, if it is missing', async () => {
    const newBlog = {
      title: 'Third blog',
      author: 'Jest test',
      url: 'http://localhost:PORT'
      // likes
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${await tokenFun()}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost[2].likes).toBe(0)
  })

  test('return 400 Bad Request, if title or url is missing', async () => {
    const newBlog = {
      // title: 'Third blog',
      author: 'Jest test',
      // url: 'http://localhost:PORT'
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${await tokenFun()}`)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('deleting a blog is successful', async () => {
    const token = await tokenFun()

    const newBlog = {
      title: 'Third blog',
      author: 'Jest test',
      url: 'http://localhost:PORT',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogsAfterPost[2].id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)
  })
})

describe('updating a blog', () => {
  test('updating number of likes is successful', async () => {
    const token = await tokenFun()

    const newBlog = {
      title: 'Third blog',
      author: 'Jest test',
      url: 'http://localhost:PORT',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    const requestBody = {
      likes: 30
    }
    await api
      .put(`/api/blogs/${blogsAfterPost[2].id}`)
      .send(requestBody)
      .set('authorization', `bearer ${token}`)
      .expect(200)
    const blogsAfterPut = await helper.blogsInDb()

    expect(blogsAfterPut[2].likes).toBe(30)
  })
})

afterAll(() => {
  mongoose.connection.close()
})