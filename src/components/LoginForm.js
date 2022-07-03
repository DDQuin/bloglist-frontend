import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import {
    initializeUser,
    loginUser,
    logoutUserBack,
} from '../reducers/userReducer'
import { Table, Form, Button } from 'react-bootstrap'

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
        <Form onSubmit={loginUserE}>
            <h2>log in application</h2>
            <Form.Group>
                <div>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        id="username"
                    />
                </div>
                <div>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        id="password"
                    />
                </div>
                <Button variant="primary" type="submit" id="login-button">
                    login
                </Button>
            </Form.Group>
        </Form>
    )
}

export default LoginForm
