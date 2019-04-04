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

// const mostBlogs = (blogs) => {
//   const objekti = {
//     author: '',
//     blogs: ''
//   }

//   const summattu = _.countBy(_.map(blogs,'author'))
//   objekti.author = _.max(Object.keys(summattu), o => summattu[o])
//   objekti.blogs = _.max(Object.values(summattu), o => summattu[o])

//   return objekti
// }

module.exports = {
  dummy,
  totalLikes
}