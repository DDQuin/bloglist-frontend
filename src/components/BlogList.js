import BlogCard from './BlogCard'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, deleteBlogBack } from '../reducers/blogReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

const BlogList = ({ blogs, user }) => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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
            <Table striped>
                <tbody>
                    <tr>
                        <th>Name</th>
                    </tr>
                    {sortedBlogs.map((blog) => (
                        <BlogLink
                            key={blog.id}
                            blog={blog}
                            isOwner={
                                user && blog.user.username === user.username
                            }
                            user={user}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

const BlogLink = ({ blog, isOwner }) => {
    const dispatch = useDispatch()
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }
    const handleDelete = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog.id.toString())
        }
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
    return (
        <tr>
            <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
                {isOwner && (
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(blog)}
                        id="remove"
                    >
                        remove
                    </Button>
                )}
            </td>
        </tr>
    )
}

/*
<BlogCard
                    key={blog.id}
                    blog={blog}
                    isOwner={user && blog.user.username === user.username}
                />
                */

export default BlogList
