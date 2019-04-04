const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('blogsGet', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned notes', async () => {
    const response = await api.get("/api/blogs")
    const contents = response.body.map(r => r.author)
    expect(contents).toContain("pullo")
  })

  test('id kenttä on id eikä _id', async () => {
    const response = await helper.blogsInDb()
    expect(response[0].id).toBeDefined()
  })
})

describe('blogsPost', () => {
  test('blogien luominen mahdollista', async () => {
    await api
      .post('/api/blogs')
      .send(helper.oneNote)
      .set('Accept', 'application/json')
      .expect(201)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(3)
  })

  test('0 likeä menee läpi', async () => {
    await api
      .post('/api/blogs')
      .send(helper.oneNoteNoLikes)
      .set('Accept', 'application/json')
      .expect(201)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(3)
  })

  test('Menee läpi jos ei author', async () => {
    const noAuthor = helper.oneNote
    delete noAuthor.author
    await api
      .post('/api/blogs')
      .send(noAuthor)
      .set('Accept', 'application/json')
      .expect(201)
  })

  test('Ei mene läpi jos ei title', async () => {
    const noTitle = helper.oneNote
    delete noTitle.title
    await api
      .post('/api/blogs')
      .send(noTitle)
      .set('Accept', 'application/json')
      .expect(400)
  })

  test('Ei mene läpi jos ei url', async () => {
    const noUrl = helper.oneNote
    delete noUrl.url
    await api
      .post('/api/blogs')
      .send(noUrl)
      .set('Accept', 'application/json')
      .expect(400)
  })

})

//token autentikaatio ja poisto ominaisuudet
// tee testfile loginille?


afterAll(() => {
  mongoose.connection.close()
})