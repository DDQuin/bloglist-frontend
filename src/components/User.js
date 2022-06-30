import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useNavigate,
} from 'react-router-dom'

const User = ({ users }) => {
    const id = useParams().id
    const user = users.find((a) => a.id === id)
    if (!user) {
        return <div>no user found</div>
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User
