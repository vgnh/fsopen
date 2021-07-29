const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./user_api_helper.js')
const User = require('../models/user.js')
const app = require('../app.js')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('addition of new user', () => {
  test('valid user is added', async () => {
    const newUser = {
      username: 'validUsername',
      name: 'Valid User',
      password: 'haxxor'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAfterPost.map(user => user.username)
    expect(usernames).toContain('validUsername')
  })

  test('user without username is not added', async () => {
    const newUser = {
      //username: 'validUsername',
      name: 'Valid User',
      password: 'haxxor'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)
  })

  test('user with username length < 3 not added', async () => {
    const newUser = {
      username: 'va',
      name: 'Valid User',
      password: 'haxxor'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)
  })

  test('user without unique username not added', async () => {
    const newUser = {
      username: 'testUsername',
      name: 'Valid User',
      password: 'haxxor'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)
  })

  test('user without password is not added', async () => {
    const newUser = {
      username: 'validUsername',
      name: 'Valid User',
      //password: 'haxxor'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)
  })

  test('user with password length < 3 not added', async () => {
    const newUser = {
      username: 'validUsername',
      name: 'Valid User',
      password: 'ha'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})