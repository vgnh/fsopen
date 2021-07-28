const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const Blog = require('../models/blog.js')
const app = require('../app.js')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  /* const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray) */
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('correct number of blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
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
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('deleting a blog is successful', async () => {
    /* const newBlog = {
      title: 'Third blog',
      author: 'Jest test',
      url: 'http://localhost:PORT',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb() */
    const blogs =  await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogs[1].id}`)
      .expect(204)
  })
})

describe('updating a blog', () => {
  test('updating number of likes is successful', async () => {
    /* const newBlog = {
      title: 'Third blog',
      author: 'Jest test',
      url: 'http://localhost:PORT',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAfterPost = await helper.blogsInDb() */
    const blogs =  await helper.blogsInDb()
    const requestBody = {
      likes: 30
    }
    await api
      .put(`/api/blogs/${blogs[1].id}`)
      .send(requestBody)
      .expect(200)
    const blogsAfterPut = await helper.blogsInDb()

    expect(blogsAfterPut[1].likes).toBe(30)
  })
})

afterAll(() => {
  mongoose.connection.close()
})