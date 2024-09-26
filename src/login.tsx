import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import todoLogo from './assets/todo.svg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface LoginProps {
  setAuthenticated: (authenticated: boolean) => void;
}

export default function Login({ setAuthenticated }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if the user is already authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setAuthenticated(true);
      window.location.href = '/'; // Redirect to home if already authenticated
    }
  }, [setAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('jwt', data.token); // Store token in local storage
        setAuthenticated(true);
        window.location.href = '/';
      } else {
        setError(data.error || 'Email or password is incorrect');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate('/sign_in'); // Use navigate to go to sign-in page
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='first_div'>
        <a href="/">
          <img src={todoLogo} className="logo todo" alt="ToDo logo" />
        </a>
      </div>
      <h1>Welcome, please login</h1>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '55ch' } }}
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
        <p className='sign_in_invite'>* required field</p>
        <Button type="submit" variant="contained" color="primary" className='log_in' disabled={loading}>
          {loading ? <CircularProgress className='progress_login' /> : 'Login'}
        </Button>
        <p className='sign_in_invite'>Don't have an account yet?</p>
        <Chip label="Sing in now" variant="outlined" onClick={handleSignUpClick} className='sign_in_chip' />
      </Box>
      {error && (
        <div>
          <Alert variant="outlined" severity="error">
            {error}
          </Alert>
        </div>
      )}
    </ThemeProvider>
  );
}
