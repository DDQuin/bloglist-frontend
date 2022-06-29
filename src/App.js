import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { createBlog, initializeBlogs } from './reducers/blogReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])
    //const [blogs, setBlogs] = useState([])
    const blogs = useSelector((state) => state.blogs)
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()

    // useEffect(() => {
    //     blogService.getAll().then((blogs) => setBlogs(blogs))
    // }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (userObject) => {
        try {
            const user = await loginService.login(userObject)
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            dispatch(
                setNotification(
                    {
                        message: 'Wrong credentials',
                        type: 'error',
                    },
                    5
                )
            )
        }
    }

    const logoutUser = async () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

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

    const addLike = async (blogAdd) => {
        try {
            const id = blogAdd.id.toString()
            const blogObject = {
                tite: blogAdd.title,
                url: blogAdd.url,
                author: blogAdd.author,
                likes: blogAdd.likes + 1,
            }
            const returnedBlog = await blogService.update(id, blogObject)
            setBlogs(
                blogs.map((blog) => (blog.id !== id ? blog : returnedBlog))
            )
            dispatch(
                setNotification(
                    {
                        message: `Liked ${returnedBlog.title} `,
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

    const deleteBlog = async (id) => {
        try {
            await blogService.deleteBlog(id)
            setBlogs(blogs.filter((blog) => blog.id !== id))
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

    const blogList = () => {
        const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
        return (
            <div>
                <h2>blogs</h2>

                <p>
                    {user.name} logged-in{' '}
                    <button onClick={logoutUser}>logout</button>
                </p>
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
                        addLike={() => addLike(blog)}
                        deleteBlog={deleteBlog}
                        isOwner={user && blog.user.username === user.username}
                    />
                ))}
            </div>
        )
    }

    return (
        <div>
            <Notification />
            {user === null ? <LoginForm login={handleLogin} /> : blogList()}
        </div>
    )
}

export default App
