import { useState } from 'react'

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

            <form onSubmit={addBlog}>
                title:
                <input
                    value={newTitle}
                    onChange={handleTitleChange}
                    data-testid="title"
                    id="title"
                />
                <br></br>
                author:
                <input
                    value={newAuthor}
                    onChange={handleAuthorChange}
                    data-testid="author"
                    id="author"
                />
                <br></br>
                url:
                <input
                    value={newUrl}
                    onChange={handleUrlChange}
                    data-testid="url"
                    id="url"
                />
                <br></br>
                <button data-testid="create" type="submit" id="create">
                    create
                </button>
            </form>
        </div>
    )
}

export default BlogForm
