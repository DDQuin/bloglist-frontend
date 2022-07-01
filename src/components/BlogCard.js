import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createBlog,
    initializeBlogs,
    likeBlog,
    deleteBlogBack,
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
const Blog = ({ blog, isOwner }) => {
    const dispatch = useDispatch()
    const [displayed, setDisplay] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const deleteBlog = async (id) => {
        try {
            dispatch(deleteBlogBack(id))
            dispatch(
                setNotification(
                    {
                        message: 'Deleted blog ',
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

    const handleDelete = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id.toString())
        }
    }
    if (!displayed) {
        return (
            <div style={blogStyle}>
                <div data-testid="blog-simple" data="blog">
                    {blog.title} {blog.author}{' '}
                    <button data-testid="show" onClick={() => setDisplay(true)}>
                        view
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div style={blogStyle}>
                <div data-testid="blog-detail" data="blog">
                    {blog.title}{' '}
                    <button onClick={() => setDisplay(false)}>hide</button>
                    <br></br>
                    {blog.url}
                    <br></br>
                    likes {blog.likes}{' '}
                    <button data-testid="like" onClick={() => addLike(blog)}>
                        like
                    </button>
                    <br></br>
                    {blog.author}
                    <br></br>
                    {isOwner && (
                        <button onClick={handleDelete} id="remove">
                            remove
                        </button>
                    )}
                </div>
            </div>
        )
    }
}

export default Blog
