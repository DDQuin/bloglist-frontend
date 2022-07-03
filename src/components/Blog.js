import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useNavigate,
} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createBlog,
    initializeBlogs,
    likeBlog,
    deleteBlogBack,
    commentBlog,
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'

const Blog = ({ blogs }) => {
    const dispatch = useDispatch()
    const id = useParams().id
    const blog = blogs.find((b) => b.id === id)
    if (!blog) {
        return <div>Blog not found</div>
    }

    const addLike = async (blogAdd) => {
        try {
            const id = blogAdd.id.toString()
            dispatch(likeBlog(id, blogAdd))
            dispatch(
                setNotification(
                    {
                        message: `Liked ${blogAdd.title} `,
                        type: 'success',
                    },
                    5
                )
            )
        } catch (exception) {
            console.log(exception)
            dispatch(
                setNotification(
                    {
                        message: `${exception.response.data.error}`,
                        type: 'error',
                    },
                    5
                )
            )
        }
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <br></br>
            {blog.likes} likes{' '}
            <Button onClick={() => addLike(blog)}>like</Button>
            <br></br>
            added by {blog.author}
            <h3>comments</h3>
            <CommentAdder blog={blog} />
            <ul>
                {blog.comments.map((comment) => (
                    <li>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

const CommentAdder = ({ blog }) => {
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState('')

    const handleCommentChange = (event) => {
        setNewComment(event.target.value)
    }

    const addComment = async (event) => {
        event.preventDefault()

        try {
            const id = blog.id.toString()
            dispatch(commentBlog(id, blog, newComment))
            dispatch(
                setNotification(
                    {
                        message: `commented ${blog.title} `,
                        type: 'success',
                    },
                    5
                )
            )
            setNewComment('')
        } catch (exception) {
            console.log(exception)
            dispatch(
                setNotification(
                    {
                        message: `${exception.response.data.error}`,
                        type: 'error',
                    },
                    5
                )
            )
        }
    }

    return (
        <div>
            <Form onSubmit={addComment}>
                <Form.Group>
                    <Form.Control
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <Button type="submit">add comment</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Blog
