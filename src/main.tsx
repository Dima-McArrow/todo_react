import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Login from './login.tsx';
import './index.css';
import CircularProgress from '@mui/material/CircularProgress';
import SignIn from './sign_in.tsx';
import CreateTask from './new_task.tsx';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number; // JWT expiration time
}

function Main() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log("The token: ", token);

    if (token) {
      try {
        // Decode the token to check the expiration
        const decoded: JwtPayload = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now(); // Compare expiration with current time

        if (!isExpired) {
          setAuthenticated(true); // Token is valid
        } else {
          localStorage.removeItem('jwt'); // Remove expired token
        }
      } catch (error) {
        console.error('Token is invalid:', error);
        localStorage.removeItem('jwt'); // Remove invalid token
      }
    }

    setLoading(false); // Loading is done after checking for the token
  }, []);

  if (loading) {
    return (
      <div className='progress'>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={authenticated ? <App /> : <Login setAuthenticated={setAuthenticated} />} />
      <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/new_task" element={<CreateTask />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </StrictMode>,
);
