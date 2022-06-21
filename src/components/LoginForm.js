import { useState } from 'react' 

const LoginForm = ({ login}) => {
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
}

export default LoginForm