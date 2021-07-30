import React from 'react'

const CreateNew = ({createNewBlog, blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title: &nbsp;
          <input
            type="text"
            value={blogTitle}
            name="Blog Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author: &nbsp;
          <input
            type="text"
            value={blogAuthor}
            name="Blog Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url: &nbsp;
          <input
            type="text"
            value={blogUrl}
            name="Blog Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateNew