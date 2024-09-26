import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Login from './login.tsx';
import './index.css';
import CircularProgress from '@mui/material/CircularProgress';
import SignIn from './sign_in.tsx';
import CreateTask from './new_task.tsx';

function Main() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // Added useNavigate hook

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt');
      console.log("the tocken: ", token);
      if (!token) {
        
        return; // No token means not authenticated
      }

      try {
        const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/check_auth.php', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        setLoading(false);
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
    <Routes>
      <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
      <Route path="/" element={authenticated ? <App /> : <Login setAuthenticated={setAuthenticated} />} />
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
