const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')


userRouter.get('/', async (request, response, next) => {

  try {
    //palauttaa kaikki vitun käyttäjät tähän halutaan vain omat
    const result = await User.find({})
    //esimerkki populatesta
    //.populate('blogs',{ title: 1, author: 1, url: 1, likes: 1 })
    response.status(200).json(result)
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
    console.log('request params.id', request.params.id)
    await User.findOneAndDelete({ _id: request.params.id })
    response.status(204).end()
  }catch(error){
    next(error)
  }
})

module.exports = userRouter