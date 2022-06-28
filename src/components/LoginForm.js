import { useState } from 'react'

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (event) => {
        event.preventDefault()
        login({
            username: username,
            password: password,
        })

        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={loginUser}>
            <h2>log in application</h2>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    id="username"
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    id="password"
                />
            </div>
            <button type="submit" id="login-button">
                login
            </button>
        </form>
    )
}

export default LoginForm
