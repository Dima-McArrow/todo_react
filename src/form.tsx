import React from 'react'
import './App.css'
import 'react-awesome-button/dist/styles.css';
import BasicSelect from './select_importance';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function BasicDatePicker() {
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <DatePicker label="Due date" />
      
    </LocalizationProvider>
  );
}


interface TaskState {
  title: string;
  description: string;
  importance: number;
  dueDate: string;
  createdAt: string;
  isDone: boolean;
}

class TaskForm extends React.Component<{}, TaskState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      title: '',
      description: '',
      importance: 0,
      dueDate: '',
      isDone: false,
      createdAt: ''
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(this.state)
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit} className='todoForm'>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Task name" variant="outlined" />
          </Box>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '100%', } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-multiline-flexible" label="Task description" variant="outlined" multiline />
          </Box>
          <BasicSelect />
          <BasicDatePicker />
        </form>
      </div>
    )
  }
}


export default TaskForm