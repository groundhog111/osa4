const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    var user = await User.findOne({ username: body.username })
    // console.log('user', user)
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    //keksi tähän ei kovakoodattu tapa
    user = { token: token, id: user.id, username: user.username, api: user.api }
    response
      .status(200)
      .send(user)
  } catch(error) {next(error)}
})

module.exports = loginRouter