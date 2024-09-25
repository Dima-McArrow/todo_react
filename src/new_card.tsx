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
import CustomizedSwitches from './done_switch';
import BasicModal from './task_info_modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';


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

// Task interface
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
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getTasksByUser = async () => {
      try {
        const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/get_tasks.php', {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies) with the request
        });

        const data = await response.json();
        console.info(data); // Log the response data

        // Set authentication state and user name based on response
        
        
        setUserId(data.user_id); // Get user name from response

          // Make sure tasks are fetched and set them in state
        
        setTasks(data); // Assuming tasks are returned in `data.tasks`
        
        
      } catch (error) {
        console.error('Error fetching tasks', error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    getTasksByUser(); // Call the function to fetch tasks
  }, []);

  console.log(userId)

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
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
              <Typography variant="caption">
                Task created: {task.created_at}
                <br />
                Task ID: {task.id}
                <br />
                User ID: {task.user_id}
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
              {/* Pass task details to each modal */}
              <BasicModal task={task} />
              <CustomizedSwitches />
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
