  // main.tsx
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

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = localStorage.getItem('jwt'); // Retrieve the JWT from local storage
          console.info("token from main.tsx :");
          console.info(token);
          const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/check_auth.php', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json', // Set content type if necessary
            },
            credentials: 'include', // Include cookies with the request
          });

          const data = await response.json();
          console.info("data from main.tsx :");
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
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/" element={authenticated ? <App /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/new_task" element={<CreateTask />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    );
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Main />
    </StrictMode>,
  );
