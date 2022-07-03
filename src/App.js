import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import BlogCard from './components/BlogCard'
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
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

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

    if (!user)
        return (
            <div className="container">
                <Notification />
                <LoginForm />
            </div>
        )

    return (
        <div className="container">
            <Notification />
            <NavigationBar user={user} />
            <h2>Blog App</h2>
            <Routes>
                <Route
                    path="/"
                    element={<BlogList blogs={blogs} user={user} />}
                />
                <Route path="/users" element={<UserList users={users} />} />
                <Route path="/users/:id" element={<User users={users} />} />
                <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
            </Routes>
        </div>
    )
}

const NavigationBar = ({ user }) => {
    const dispatch = useDispatch()
    const padding = {
        padding: 5,
    }
    const navStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        backgroundColor: 'silver',
        borderWidth: 1,
        marginBottom: 5,
    }
    const logoutStyle = {
        color: 'aqua',
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/">
                            blogs
                        </Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users">
                            users
                        </Link>
                    </Nav.Link>
                    <div style={logoutStyle}>
                        {user.name} logged-in{' '}
                        <Button onClick={() => dispatch(logoutUserBack())}>
                            logout
                        </Button>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default App
