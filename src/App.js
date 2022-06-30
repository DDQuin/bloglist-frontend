import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import {
    createBlog,
    initializeBlogs,
    deleteBlogBack,
} from './reducers/blogReducer'
import {
    initializeUser,
    loginUser,
    logoutUserBack,
} from './reducers/userReducer'
import BlogList from './components/BlogList'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUser())
        dispatch(initializeUsers())
    }, [dispatch])
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    const users = useSelector((state) => state.users)

    if (user === null)
        return (
            <div>
                <Notification />
                <LoginForm />
            </div>
        )

    return (
        <div>
            <Notification />
            <BlogHeader user={user} />
            <Routes>
                <Route
                    path="/"
                    element={<BlogList blogs={blogs} user={user} />}
                />
                <Route path="/users" element={<UserList users={users} />} />
                <Route path="/users/:id" element={<User users={users} />} />
            </Routes>
        </div>
    )
}

const BlogHeader = (user) => {
    const dispatch = useDispatch()
    return (
        <div>
            <h2>blogs</h2>

            <p>
                {user.user.name} logged-in{' '}
                <button onClick={() => dispatch(logoutUserBack())}>
                    logout
                </button>
            </p>
        </div>
    )
}

export default App
