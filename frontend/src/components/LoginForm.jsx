import { useState } from 'react'
import { Container, TextField, Button, Typography } from '@material-ui/core'

const LoginForm = ({ setUserData, onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser()
  }

  const loginUser = async () => {
    const data = { username: username, password: password }
    const res = await fetch('http://localhost:8000/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status === 401) {
      setLoginError(true)
      return
    } else if (res.status === 302) {
      setLoginError(false)
      const resJson = await res.json()
      console.log(resJson.user)
      setUserData(resJson.user)
      onClose()
    }

  }

  return (
    <Container component='main' maxWidth='xs'>
      <form onSubmit={handleSubmit} noValidate>
        {loginError &&
          <Typography variant='h5' align='center' color='error'>
            Invalid Credentials
          </Typography>
        }
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          error={loginError}
          helperText='Please enter username'
          autoFocus
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={loginError}
          helperText='Please enter password'
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm