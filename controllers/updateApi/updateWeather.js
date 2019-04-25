const updateWeatherRouter = require('express').Router()
// const User = require('../models/user')
const Weather = require('../../models/api/weather')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')




updateWeatherRouter.post('/', async (request, response, next) => {
  try {
    const city = request.body.city

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findOne({ _id: decodedToken.id })
    console.log('Decoded tokenilla haettu user:', user)

    const existingWeather = await Weather.findOne({ user: user._id })

    if (existingWeather) {

      await Weather.findOneAndUpdate({ _id: existingWeather._id },{ "city": city })

    }
    else {

      const weather = new Weather({
        city: city,
        user: user._id
      })
      await weather.save()

    }

    response.status(200).end()
  }
  catch (error) { next(error) }
})

module.exports = updateWeatherRouter