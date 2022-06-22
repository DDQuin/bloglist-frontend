import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotificationMessage( { message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const logoutUser = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage( { message: `Added ${returnedBlog.title} to blogs`, type: 'success' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
      setNotificationMessage( { message: `${exception.response.data.error}`, type: 'error' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      setNotificationMessage( { message: `Liked ${returnedBlog.title} `, type: 'success' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
      setNotificationMessage( { message: `${exception.response.data.error}`, type: 'error' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotificationMessage( { message: 'Deleted blog ', type: 'success' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
      setNotificationMessage( { message: `${exception.response.data.error}`, type: 'error' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const blogList = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <h2>blogs</h2>

        <p>{user.name} logged-in <button onClick={logoutUser}>logout</button></p>
        {<Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        }
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={() => addLike(blog)} deleteBlog={deleteBlog} isOwner={user && blog.user.username === user.username}/>
        )}
      </div>
    )
  }


  return (
    <div>
      {notificationMessage === null ? '':  <Notification message={notificationMessage.message} type={notificationMessage.type} />}

      {user === null ?
        <LoginForm login={handleLogin}/> : blogList() }
    </div>
  )
}


export default App
