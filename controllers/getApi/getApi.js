const getApi = require('express').Router()

const getWeatherRouter = require('./getWeather')

getApi.use('/getWeather', getWeatherRouter)

module.exports = getApi
