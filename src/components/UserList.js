import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const UserList = (users) => {
    if (!users) {
        return <div>something went wrong</div>
    }
    return (
        <div>
            <h2>Users</h2>
            {users.users.map((user) => (
                <div key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>{' '}
                    {user.blogs.length}
                </div>
            ))}
        </div>
    )
}

export default UserList
