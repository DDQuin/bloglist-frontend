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
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

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
            <button onClick={() => addLike(blog)}>like</button>
            <br></br>
            added by {blog.author}
        </div>
    )
}

export default Blog
