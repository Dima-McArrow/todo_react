import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import todoLogo from './assets/todo.svg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function login() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <>
        <div className='first_div'>
          <a href="index.html" target="_blank">
            <img src={todoLogo}
              className="logo todo"
              alt="ToDo logo" />
          </a>
        </div>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          className='login_form'
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" name='email' type='email' required />
        </Box>
      </>
    </ThemeProvider>

  )
}