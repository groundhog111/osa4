const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const result = await Blog.find({}).populate('user', { username: 1, id: 1 })
    response.json(result)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id).populate('user', { username: 1, id: 1 } )
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


blogsRouter.post('/', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({ 
      title: request.body.title,
      author: request.body.author,
      likes:request.body.likes,
      url: request.body.url,
      user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  }catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if(!blog) return response.status(401).json({ error: 'token missing or invalid' }).end()

    if (decodedToken.id.toString() === blog.user.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    response.status(400).end()


  } catch(error) {
    next(error)
  }
})

// ei kenttä blog.user ole tyypiltään merkkijono vaan object.
// Eli jos haluat verrata kannasta haetun olion id:tä merkkijonomuodossa olevaan id:hen, ei normaali vertailu toimi.
// Kannasta haettu id tulee muuttaa vertailua varten merkkijonoksi:



blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    likes:request.body.likes,
    url: request.body.url
  }
  try {
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id , blog)
    response.json(updatedNote.toJSON())
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter


