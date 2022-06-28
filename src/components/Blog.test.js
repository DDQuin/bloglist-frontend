import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('rendering blog', () => {
    let mockHandler
    beforeEach(() => {
        mockHandler = jest.fn()
        const blog = {
            title: 'Component testing is done with react-testing-library',
            url: 'htt.com',
            author: 'Bob',
            likes: 4,
        }
        render(<Blog blog={blog} addLike={mockHandler} />)
    })
    test('renders content with only author and titlew', () => {
        const divBlog = screen.getByTestId('blog-simple')
        expect(divBlog).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(divBlog).toHaveTextContent('Bob')
        expect(divBlog).not.toHaveTextContent('htt.com')
        expect(divBlog).not.toHaveTextContent('4')
    })

    test('showing blog shows all details', async () => {
        const user = userEvent.setup()
        const button = screen.getByTestId('show')
        await user.click(button)
        const divBlog = screen.getByTestId('blog-detail')
        expect(divBlog).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(divBlog).toHaveTextContent('Bob')
        expect(divBlog).toHaveTextContent('htt.com')
        expect(divBlog).toHaveTextContent('4')
    })

    test('like can be called twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByTestId('show')
        await user.click(button)

        const likeButton = screen.getByTestId('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByTestId('title')
    const inputAuthor = screen.getByTestId('author')
    const inputUrl = screen.getByTestId('url')
    const sendButton = screen.getByTestId('create')

    await user.type(inputTitle, 'testing a form...')
    await user.type(inputAuthor, 'Bob')
    await user.type(inputUrl, 'google.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('Bob')
    expect(createBlog.mock.calls[0][0].url).toBe('google.com')
})
