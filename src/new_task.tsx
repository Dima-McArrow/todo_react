import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import todoLogo from './assets/todo.svg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './new_task.css';
import SelectImportance from './select_importance';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Alert from '@mui/material/Alert';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function TaskDatePicker({ dueDate, setDueDate }: { dueDate: Dayjs | null; setDueDate: React.Dispatch<React.SetStateAction<Dayjs | null>> }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Due date"
        value={dueDate}
        onChange={(newDate) => setDueDate(newDate)}
        slotProps={{ textField: { fullWidth: true } }}
      />
    </LocalizationProvider>
  );
}

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [userId, setUserId] = useState(''); // Set this from your authentication mechanism
  const [error, setError] = useState('');

  // Fetch the user ID based on your authentication mechanism, if using cookies or localStorage
  useEffect(() => {
    // For example, fetching from localStorage (adjust as per your auth logic)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleTaskCreation = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation
    if (!title || !description || !importance || !dueDate) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      const formattedDueDate = dueDate ? dayjs(dueDate).format('YYYY-MM-DD') : '';

      const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/set_task.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include', // Include cookies with the request
        body: new URLSearchParams({
          title,
          description,
          importance,
          due_date: formattedDueDate,
          user_id: userId, // Make sure to set this value correctly
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.info('Task created successfully:', data);
        // Clear form inputs after task creation
        setTitle('');
        setDescription('');
        setImportance('');
        setDueDate(null);
        setError('');
      } else {
        setError(data.message || 'Failed to create task');
      }

    } catch (err) {
      setError('An error occurred while creating the task');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='first_div'>
        <a href="/">
          <img src={todoLogo} className="logo todo" alt="ToDo logo" />
        </a>
      </div>
      <h1>New task:</h1>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '55ch' } }}
        noValidate
        autoComplete="off"
        className='new_task_form'
        onSubmit={handleTaskCreation}
      >
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          name="description"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDatePicker dueDate={dueDate} setDueDate={setDueDate} />
        <SelectImportance importance={importance} setImportance={setImportance} />
        <p className='required_field'>* required field</p>
        <Button type="submit" variant="contained" color="primary" className='submit_task'>
          Create Task
        </Button>
      </Box>
      {error && <Alert variant="outlined" severity="error">
        {error}
      </Alert>}
    </ThemeProvider>
  );
}
