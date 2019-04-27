const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const config = require('./utils/config')

const app = express()
// const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const updateWeatherRouter = require('./controllers/updateApi/updateWeather')
const getApi = require('./controllers/getApi/getApi')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to MongoDB')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connection to MongoDB:', error.message)
  })

// kun frontti käyttöön
// app.use(express.static('build'))

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

//tee oma moduuli autentikaatiolle siten että controllerit vaan checkkaa sieltä mikä keissi
// NYT KUKA VAIN VOI POISTAA KENET VAIN SEKÄ UPDATET

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/update/updateweather', updateWeatherRouter)
app.use('/api/getApi', getApi)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app