import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import highPriority from './assets/high-priority-svgrepo-com.svg';
import mediumPriority from './assets/medium-priority-svgrepo-com.svg';
import lowPriority from './assets/low-priority-svgrepo-com.svg';
import CustomizedSwitches from './done_switch';
import BasicModal from './task_info_modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import Tooltip from '@mui/material/Tooltip';

function returnPriorityIcon(importance: number) {
  switch (importance) {
    case 1:
      return highPriority;
    case 2:
      return mediumPriority;
    case 3:
      return lowPriority;
    default:
      return lowPriority;
  }
}

interface Task {
  id: number;
  title: string;
  description: string;
  importance: number;
  due_date: string;
  created_at: string;
  is_done: boolean;
  user_id: number;
}

export default function BasicCard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost/app/get_tasks.php')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        console.info(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {tasks.map((task) => (
        <Card key={task.id} sx={{ minWidth: 275 }}>
          <CardContent>
            <img className='priority_pic' src={returnPriorityIcon(task.importance)} alt="Priority" />
            <Typography variant="h5" component="div">
              {task.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5, mt: 2 }}>
              {task.description}
            </Typography>
            <hr className='hr_card' />
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              Due date:
            </Typography>
            <div className="due-date-container">
              {/* The calendar is now always visible */}
              <div className="calendar-tooltip">
                <DatePicker
                  selected={new Date(task.due_date)}
                  inline
                  readOnly
                  calendarStartDay={1}
                  disabled
                  disabledKeyboardNavigation
                />
              </div>
            </div>
            <Typography variant="caption">
              Task created: {task.created_at}
              <br />
              {task.id}
              <br />
              {task.user_id}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="Delete task" arrow>
              <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit task" arrow>
              <IconButton aria-label="edit" size="small">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <BasicModal />
            <CustomizedSwitches />
          </CardActions>
        </Card>
      ))}
    </>
  );
}
