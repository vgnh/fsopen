import React from 'react'

const CreateNewBlog = ({handleCreateBlog, blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: &nbsp;
          <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author: &nbsp;
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url: &nbsp;
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateNewBlog