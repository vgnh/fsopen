const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = blogs[0]

  for(let blog of blogs) {
    if(blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog
    }
  }

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

const mostBlogs = (blogs) => {
  let authorBlogMap = new Map()

  for(let blog of blogs) {
    if(!authorBlogMap.has(blog.author)) {
      authorBlogMap.set(blog.author, 0)
    }
    authorBlogMap.set(blog.author, authorBlogMap.get(blog.author) + 1)
  }

  // authorBlogMap.entries().next().value is the first entry
  // in authorBlogMap. It looks like ['author name', count]
  let authorWithMostBlogs = authorBlogMap.entries().next().value[0]
  for(let author of authorBlogMap.keys()) {
    if(authorBlogMap.get(authorWithMostBlogs) < authorBlogMap.get(author)) {
      authorWithMostBlogs = author
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: authorBlogMap.get(authorWithMostBlogs)
  }
}

const mostLikes = (blogs) => {
  let authorLikesMap = new Map()

  for(let blog of blogs) {
    if(!authorLikesMap.has(blog.author)) {
      authorLikesMap.set(blog.author, 0)
    }
    authorLikesMap.set(blog.author, authorLikesMap.get(blog.author) + blog.likes)
  }

  // authorLikesMap.entries().next().value is the first entry
  // in authorLikesMap. It looks like ['author name', count]
  let authorWithMostLikes = authorLikesMap.entries().next().value[0]
  for(let author of authorLikesMap.keys()) {
    if(authorLikesMap.get(authorWithMostLikes) < authorLikesMap.get(author)) {
      authorWithMostLikes = author
    }
  }

  return {
    author: authorWithMostLikes,
    likes: authorLikesMap.get(authorWithMostLikes)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}