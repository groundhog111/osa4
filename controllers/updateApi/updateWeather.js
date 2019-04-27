const updateWeatherRouter = require('express').Router()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')




updateWeatherRouter.post('/', async (request, response, next) => {
  try {
    const city = request.body.city

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const result = await User.findOneAndUpdate({ _id: decodedToken.id }, { api: { weather: { city: city } } } )

    response.status(200).send(result)
  }
  catch (error) { next(error) }
})

module.exports = updateWeatherRouter