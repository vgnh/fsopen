import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog.js'
import NewBlogForm from './NewBlogForm.js'

describe('blog card', () => {
  let component
  const blog = {
    title: 'Something about Rust',
    author: 'Amos',
    url: 'https://fasterthanli.me',
    likes: 3,
    user: {
      name: 'ABC'
    }
  }
  const increaseLikesOf = jest.fn()
  const removeBlog = jest.fn()
  const visibilityOfRemove = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} increaseLikesOf={increaseLikesOf} removeBlog={removeBlog} visibilityOfRemove={visibilityOfRemove} />
    )
  })

  test('displays title and author by default', () => {
    const div = component.container.querySelector('.blogCard')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
  })
  test('does not render url or number of likes by default', () => {
    const div = component.container.querySelector('.blogInfoCard')
    expect(div).toHaveStyle('display: none')
  })
  test('url and number of likes are shown when \'view\' is clicked', () => {
    const showInfoButton = component.getByText('view')
    fireEvent.click(showInfoButton)
    const div = component.container.querySelector('.blogInfoCard')
    expect(div).not.toHaveStyle('display: none')
  })
  test('if like is clicked twice, event handler is called twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(increaseLikesOf.mock.calls).toHaveLength(2)
  })
})

describe('blog form', () => {
  let component
  const createNewBlog = jest.fn()
  beforeEach(() => {
    component = render(
      <NewBlogForm createNewBlog={createNewBlog} />
    )
  })
  test('<NewBlogForm /> updates parent with right info, and calls createNewBlog()', () => {
    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#blogTitle')
    const authorInput = component.container.querySelector('#blogAuthor')
    const urlInput = component.container.querySelector('#blogUrl')
    fireEvent.change(titleInput, {
      target: { value: 'Kotlin' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'JetBrains' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'https://kotlinlang.org/' }
    })
    fireEvent.submit(form)
    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe('Kotlin')
    expect(createNewBlog.mock.calls[0][0].author).toBe('JetBrains')
    expect(createNewBlog.mock.calls[0][0].url).toBe('https://kotlinlang.org/')
  })
})