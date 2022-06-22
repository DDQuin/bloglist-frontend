import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content with only author and titlew', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'htt.com',
    author: 'Bob',
    likes: 4,
  }

  render(<Blog blog={blog} />)
  const divBlog = screen.getByTestId('blog-simple')
  expect(divBlog).toHaveTextContent('Component testing is done with react-testing-library')
  expect(divBlog).toHaveTextContent('Bob')
  expect(divBlog).not.toHaveTextContent('htt.com')
  expect(divBlog).not.toHaveTextContent('4')

})