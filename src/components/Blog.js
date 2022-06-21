import { useState } from 'react'
const Blog = ({blog, addLike, deleteBlog, isOwner}) => {
  const [displayed, setDisplay] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    addLike(blog.id.toString(), {
      tite: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
    })
  }

  const handleDelete = () => {
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id.toString())
    }
  }
  if (!displayed) {
    return (
      <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={() => setDisplay(true)}>view</button>
      </div>
      </div>  
      )
  } else {
    return (
      <div style={blogStyle}>
      <div>
        {blog.title}  <button onClick={() => setDisplay(false)}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes} <button onClick={handleLike}>like</button>
        <br></br>
        {blog.author}
        <br></br>
        {isOwner && <button onClick={handleDelete}>remove</button>}
      </div>
      </div>  
      )
  }
  
}

export default Blog