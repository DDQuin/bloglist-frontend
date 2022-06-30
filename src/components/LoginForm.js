import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import {
    initializeUser,
    loginUser,
    logoutUserBack,
} from '../reducers/userReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const loginUserE = (event) => {
        event.preventDefault()
        login({
            username: username,
            password: password,
        })

        setUsername('')
        setPassword('')
    }

    const login = async (userObject) => {
        try {
            dispatch(loginUser(userObject))
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

    return (
        <form onSubmit={loginUserE}>
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
