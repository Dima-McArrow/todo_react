  import { useEffect, useState } from 'react';
  import reactLogo from './assets/react.svg';
  import viteLogo from '/vite.svg';
  import './App.css';

  import { ThemeProvider, createTheme } from '@mui/material/styles';
  import CssBaseline from '@mui/material/CssBaseline';

  import todoLogo from './assets/todo.svg';
  import ButtonAppBar from './header';
  import TasksCards from './new_card';
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
    const [filter, setFilter] = useState<number | undefined>(undefined); // Add filter state

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = localStorage.getItem('jwt'); // Retrieve JWT from local storage
          console.info("The token: ", token);

          if (!token) {
            throw new Error('No token found');
          }

          // Send request to the backend to validate the JWT and fetch user info
          const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/check_auth.php', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}` // Include the JWT in Authorization header
            },
          });

          const responseText = await response.text(); // Get raw response as text
          console.info("Raw Backend response: ", responseText); // Log the raw response
          const data = JSON.parse(responseText); // Then parse it manually

          if (data.authenticated) {
            setAuthenticated(true);
            setUserName(data.name); // Get user name from the backend
          } else {
            console.error('User not authenticated');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
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
          <ButtonAppBar onFilterChange={(filter: number | undefined) => setFilter(filter)} /> {/* Pass the filter change handler */}
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
            <TasksCards filter={filter} /> {/* Pass the filter to TasksCards */}
          </div>
          <AddTaskButton />
          <Footer />
        </>  </ThemeProvider>
    );
  }

  export default App;
