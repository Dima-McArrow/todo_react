import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import todoLogo from './assets/todo.svg';
import ButtonAppBar from './header';
import BasicCard from './new_card';
import AddTaskButton from './add_task_button';
import CircularProgress from '@mui/material/CircularProgress';

import Footer from './footer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/check_auth.php', {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies) with the request
        });

        const data = await response.json();
        console.info(data); // Log the response data

        // Set authentication state and user name based on response
        setAuthenticated(data.authenticated);
        if (data.authenticated) {
          setUserName(data.user_name); // Get user name from response
        }
      } catch (error) {
        console.error('Error checking authentication', error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    checkAuth(); // Call the function to check authentication
  }, []);

  if (loading) {
    return (
        <div className='app_progress'>
          <CircularProgress />
        </div>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <>
        <ButtonAppBar />
        <div className='first_div'>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="/">
            <img src={todoLogo} className="logo todo" alt="ToDo logo" />
          </a>
        </div>
        <h1>Tasks</h1>       
        {/* Display user name if authenticated */}
        {authenticated && <h2>Hey, {userName}!</h2>}
        <h4>Here are your tasks:</h4>
        <div className="cards_container">
          <BasicCard />
        </div>
        <AddTaskButton />
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default App;
