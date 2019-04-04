const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }
    // npx jest 'tests/user_api.test.js' --runInBand

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    console.log('usersAtEnd', usersAtEnd)
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('no password no success', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
    // npx jest 'tests/user_api.test.js' --runInBand

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('no password no success', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sd'
    }
    // npx jest 'tests/user_api.test.js' --runInBand

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

})




afterAll(() => {
  mongoose.connection.close()
})