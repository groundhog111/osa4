const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


userRouter.get('/', async (request, response, next) => {
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    var user = await User.findById(decodedToken.id)

    user = { token: request.token, id: user.id, username: user.username, api: user.api }


    response
      .status(201)
      .send(user)

  } catch(error) {next(error)}
})

userRouter.get('/test', async (request, response, next) => {

  try {
    //palauttaa kaikki vitun käyttäjät tähän halutaan vain omat
    const result = await User.find({})
    response.status(200).send(result)
  }catch(error){
    next(error)
  }
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.user,
    username: body.username,
    passwordHash
  })
  try {
    const result = await user.save()
    response.status(200).send(result)
  }catch(error){
    next(error)
  }
})

//harkitse jätetäänkö tälläiseksi vai tuleeko käyttäjälle mahdollisuus poistaa oma käyttäjänsä
userRouter.delete('/:id', async (request, response, next) => {
  // const idToDelete = request.body.id
  // CHECHKKAA TOKENI
  try {
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!request.token || !decodedToken.id) {
    //   return response.status(401).json({ error: 'token missing or invalid' })
    // }
    await User.findOneAndDelete({ _id: request.params.id })
    response.status(204).end()
  }catch(error){
    next(error)
  }
})

module.exports = userRouter