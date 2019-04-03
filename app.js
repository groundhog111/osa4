const mongoose = require('mongoose')
const cors = require('cors')
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser')
const express = require('express')
const config = require('./utils/config')

const app = express()
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to MongoDB')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })
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

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
