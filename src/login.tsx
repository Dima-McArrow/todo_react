import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import todoLogo from './assets/todo.svg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include', // Include cookies with the request
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.info(data); // Fix spelling mistake from autehnticated

      if (data.authenticated) {
        window.location.href = '/';
      } else {
        setError('Email or password is incorrect');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='first_div'>
        <a href="index.html" target="_blank">
          <img src={todoLogo} className="logo todo" alt="ToDo logo" />
        </a>
      </div>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className='login_form'
        onSubmit={handleLogin}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </ThemeProvider>
  );
}
