const User = require('../models/user.js')

const initialUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: '12345'
  },
  {
    username: 'testUsername',
    name: 'Test Name',
    password: 'asdfg'
  }
]

const nonExistingId = async () => {
  const user = new User({
    username: 'asdf',
    name: 'ASDF',
    password: 'random123#A'
  })
  await user.save()
  await user.remove()

  return user.id
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers, nonExistingId, usersInDb
}