import React from 'react'

const CreateNewBlog = ({handleCreateBlog, blogTitle, handleBlogTitleChange, blogAuthor, handleBlogAuthorChange, blogUrl, handleBlogUrlChange}) => {
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
            onChange={handleBlogTitleChange}
          />
        </div>
        <div>
          author: &nbsp;
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            onChange={handleBlogAuthorChange}
          />
        </div>
        <div>
          url: &nbsp;
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            onChange={handleBlogUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateNewBlog