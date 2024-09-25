// main.tsx
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Login from './login.tsx';
import './index.css';
import CircularProgress from '@mui/material/CircularProgress';


function Main() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/check_auth.php', {
          method: 'GET',
          credentials: 'include', // Include cookies with the request
        });

        const data = await response.json();
        console.info(data);
        setAuthenticated(data.authenticated);
      } catch (error) {
        console.error('Error checking authentication', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
        <div className='progress'>
          <CircularProgress />
        </div> 
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={authenticated ? <App /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
