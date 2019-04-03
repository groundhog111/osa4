const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, oneNote, oneNoteNoLikes
}