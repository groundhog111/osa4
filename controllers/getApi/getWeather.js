const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')

const getWeatherRouter = require('express').Router()

const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
const apiConfig = ",fi&mode=json&"
const apiKey = "appid=7448d8d1b29cb6df496a7b22ed4fab56"



getWeatherRouter.get('/:city', async (request, response, next) => {
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const fullUrl = `${apiUrl}${request.params.city}${apiConfig}${apiKey}`

    fetch(fullUrl)
      .then(res => res.json())
      .then(res => response.status(200).send(res))
      .catch(error => response.status(400).send(error))
  }
  catch (error) { next(error) }
})

module.exports = getWeatherRouter