import { useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>create new</h2>

            <Form onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        value={newTitle}
                        onChange={handleTitleChange}
                        data-testid="title"
                        id="title"
                        type="text"
                        name="title"
                    />
                    <br></br>
                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        value={newAuthor}
                        onChange={handleAuthorChange}
                        data-testid="author"
                        id="author"
                        type="text"
                        name="author"
                    />
                    <br></br>
                    <Form.Label>URL:</Form.Label>
                    <Form.Control
                        value={newUrl}
                        onChange={handleUrlChange}
                        data-testid="url"
                        id="url"
                        type="text"
                        name="url"
                    />
                    <br></br>
                    <Button
                        variant="primary"
                        data-testid="create"
                        type="submit"
                        id="create"
                    >
                        create
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm
