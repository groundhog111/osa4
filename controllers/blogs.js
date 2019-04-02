const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// blogsRouter.get('/', (request, response) => {
//    console.log("/ kutsuttu")
//   Blog.find({}).then(notes => {
//     response.json(notes.map(blog => blog.toJSON()))
//   })
// })

// vaatiiko toJson käyttöönotto mappauksen jotta toJson toimii objektitasolla

//annettua koodia
blogsRouter.get('/', (request, response) => {
  Blog
  .find({})
  .then(blogs => {
    response.json(blogs)
  })
  .catch(error => next(error))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
  .then(blog => {
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

// blogsRouter.post('/', (request, response, next) => {
  //   const body = request.body
  //   const blog = new Blog({
    //     content: body.content,
    //     important: body.important || false,
    //     date: new Date(),
    //   })
    
    //   blog.save()
    //     .then(savedNote => {
      //       response.json(savedNote.toJSON())
      //     })
      //     .catch(error => next(error))
      // })
      
      // vaatiiko toJson käyttöönotto mappauksen jotta toJson toimii objektitasolla
      
//annettua koodia
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  
  blog
  .save()
  .then(result => {
    response.status(201).json(result)
  })
  .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter


