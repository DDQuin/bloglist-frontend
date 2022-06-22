import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('rendering blog', () => {
  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'htt.com',
      author: 'Bob',
      likes: 4,
    }
    render(<Blog blog={blog} />)
  })
  test('renders content with only author and titlew', () => {
    const divBlog = screen.getByTestId('blog-simple')
    expect(divBlog).toHaveTextContent('Component testing is done with react-testing-library')
    expect(divBlog).toHaveTextContent('Bob')
    expect(divBlog).not.toHaveTextContent('htt.com')
    expect(divBlog).not.toHaveTextContent('4')
  })

  test('showing blog shows all details', async () => {

    const user = userEvent.setup()
    const button = screen.getByTestId('show')
    await user.click(button)
    const divBlog = screen.getByTestId('blog-detail')
    expect(divBlog).toHaveTextContent('Component testing is done with react-testing-library')
    expect(divBlog).toHaveTextContent('Bob')
    expect(divBlog).toHaveTextContent('htt.com')
    expect(divBlog).toHaveTextContent('4')
  })
})

