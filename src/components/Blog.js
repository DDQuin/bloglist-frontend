import { useState } from 'react'
const Blog = ({ blog, addLike, deleteBlog, isOwner }) => {
  const [displayed, setDisplay] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <div data-testid="blog-simple">
          {blog.title} {blog.author} <button data-testid="show" onClick={() => setDisplay(true)}>view</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div data-testid="blog-detail">
          {blog.title}  <button onClick={() => setDisplay(false)}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
        likes {blog.likes} <button data-testid="like" onClick={addLike}>like</button>
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