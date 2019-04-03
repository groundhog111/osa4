const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  if(typeof blogs !== 'undefined') {
    blogs.map(blog => sum += blog.likes)
    return sum
  }
  return sum
}

//lisätehtävät:
// const mostBlogs = (blogs) => {
//   const objekti = {
//     author: '',
//     blogs: ''
//   }

//   return objekti
// }

module.exports = {
  dummy,
  totalLikes
}