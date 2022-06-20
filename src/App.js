import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage( {message: 'Wrong credentials', type: 'error'})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const logoutUser = async (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in application</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogList = () => (
      <div>
      <h2>blogs</h2>

      <p>{user.name} logged-in <button onClick={logoutUser}>logout</button></p>
      {blogForm()}


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
      title:<input
        value={newTitle}
        onChange={handleTitleChange}
      />
      <br></br>
      author:<input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <br></br>
      url:<input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <br></br>
      <button type="submit">create</button>

      </form>
    </div>
  )

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
       const returnedBlog = await blogService.create(blogObject)
       setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNotificationMessage( {message: `Added ${returnedBlog.title} to blogs`, type: 'success'})
        setTimeout(() => {
        setNotificationMessage(null)
        }, 5000)
    } catch(exception) {
      console.log(exception)
      setNotificationMessage( {message: `${exception.response.data.error}`, type: 'error'})
        setTimeout(() => {
        setNotificationMessage(null)
        }, 5000)
    }
  }

  return (
    <div>
      {notificationMessage === null ? "":  <Notification message={notificationMessage.message} type={notificationMessage.type} />}
     
      {user === null ?
      loginForm() : blogList() }
    </div>
  )
}

export default App
