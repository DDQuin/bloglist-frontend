import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogList = (blogs, user) => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()
    const sortedBlogs = [...blogs.blogs].sort((a, b) => b.likes - a.likes)
    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            dispatch(createBlog(blogObject))
            dispatch(
                setNotification(
                    {
                        message: `Added ${returnedBlog.title} to blogs`,
                        type: 'success',
                    },
                    5
                )
            )
        } catch (exception) {
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
            {
                <Togglable
                    buttonLabel="new blog"
                    ref={blogFormRef}
                    id="blog-toggle"
                >
                    <BlogForm createBlog={addBlog} />
                </Togglable>
            }
            {sortedBlogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    isOwner={user && blog.user.username === user.username}
                />
            ))}
        </div>
    )
}

export default BlogList
