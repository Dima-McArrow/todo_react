import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskForm from './form'
import ButtonUsage from './form_two'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaskCards from './task_card'
import todoLogo from './assets/todo.svg'
import PositionedMenu from './menu'
import ButtonAppBar from './header'
import BasicCard from './new_card'
import AddTaskButton from './add_task_button'



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const [count, setCount] = useState(0)

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
          <a href="index.html" target="_blank">
            <img src={todoLogo} className="logo todo" alt="ToDo logo" />
          </a>
        </div>
        <h1>Tasks</h1>
        <div className="cards_container">
          <BasicCard />
        </div>
        <AddTaskButton />
      </>
    </ThemeProvider>

  )
}

export default App
