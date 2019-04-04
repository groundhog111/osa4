const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "ensimmainen",
    author: "posteli",
    likes: 2,
    url: "wwpaskatalokom"
  },
  {
    title: "toinen",
    author: "pullo",
    likes: 9,
    url: "wwpaskatalokom"
  }
]

const oneNote = {
  title: "yksittainen",
  author: "paperi",
  likes: 9,
  url: "wwpaskatalokom"
}

const oneNoteNoLikes = {
  title: "yksittainen",
  author: "tykkäyksetön",
  likes: 0,
  url: "wwpaskatalokom"
}

const newUser = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen'
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return await users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, oneNote, oneNoteNoLikes, usersInDb
}