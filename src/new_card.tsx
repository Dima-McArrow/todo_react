import { useEffect, useState } from 'react';
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
import SwitchIsDone from './done_switch';
import BasicModal from './task_info_modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// Function to return the correct priority icon
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

// Dialog to confirm task deletion
function AlertDialog({ taskId, onConfirm }: { taskId: number; onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    await deleteTask(taskId); // Delete the task
    onConfirm(); // Refresh task list
    handleClose(); // Close the dialog
  };

  return (
    <>
      <IconButton aria-label="delete" size="small" onClick={handleClickOpen}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Delete the task?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Function to delete the task
async function deleteTask(taskId: number) {
  const token = localStorage.getItem('jwt'); // Retrieve the JWT from local storage
  try {
    const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/delete_task.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}` // Include the token in the request header
      },
      body: new URLSearchParams({ id: taskId.toString() }),
    });
    const data = await response.json();
    console.info("Data from delete task: ", data);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Task interface
interface Task {
  id: number;
  title: string;
  description: string;
  importance: number;
  due_date: string;
  created_at: string;
  is_completed: number;
  user_id: number;
}

interface TasksCardsProps {
  filter: number | undefined;
}

export default function TasksCards({ filter }: TasksCardsProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasksByUser = async () => {
      const token = localStorage.getItem('jwt'); // Retrieve the JWT from local storage
      try {
        const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/get_tasks.php', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }, // Include the token in the request header
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data); // Set tasks in the state
        console.info("Data from get tasks by user: ", data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      } finally {
        setLoading(false); // End loading state
      }
    };
    getTasksByUser(); // Fetch tasks on component mount
  }, []);

  // Refresh tasks after deletion
  const refreshTasks = async () => {
    setLoading(true); // Start loading
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/get_tasks.php', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data); // Update task list after deletion
    } catch (error) {
      console.error('Error refreshing tasks', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (typeof filter === 'boolean') {
      return filter ? task.is_completed === 1 : task.is_completed === 0; // Check against 1 for completed and 0 for not completed
    } else if (typeof filter === 'number') {
      return filter === 1 ? task.is_completed === 1 : task.is_completed === 0; // Same logic for number
    }
    return true; // Show all tasks if filter is neither
  });

  console.info("Filter: ", filter);
  console.info("Filtered tasks: ", filteredTasks);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Card key={task.id} sx={{ minWidth: 275 }}>
            <CardContent>
              <img className="priority_pic" src={returnPriorityIcon(task.importance)} alt="Priority" />
              <ul>
                <li>
                  <Typography variant="h5" component="div">
                    {task.title}
                  </Typography>
                </li>
                <li>
                  <Typography sx={{ color: 'text.secondary', mb: 1.5, mt: 2 }}>
                    {task.description}
                  </Typography>
                </li>
              </ul>
              <Divider sx={{ mb: 2.7 }} />
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                Due date:
              </Typography>
              <div className="due-date-container">
                <div className="calendar-tooltip">
                  <DatePicker
                    selected={task.due_date ? new Date(task.due_date) : null}
                    inline
                    readOnly
                    calendarStartDay={1}
                    disabled
                    disabledKeyboardNavigation
                  />
                </div>
              </div>
            </CardContent>
            <CardActions>
              {/* Delete task alert dialog */}
              <AlertDialog taskId={task.id} onConfirm={refreshTasks} />

              {/* Other task actions like edit */}
              <Tooltip title="Edit task" arrow>
                <IconButton aria-label="edit" size="small">
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>

              <BasicModal task={task} />
              <SwitchIsDone taskId={task.id} />
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
          You don't have any tasks yet.
        </Typography>
      )}
    </>
  );
}
