import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// Custom styled switch for the done state
const TaskDoneSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function SwitchIsDone({ taskId }: { taskId: number }) {
  const [done, setDone] = React.useState(false);

  // Fetch the initial task state
  useEffect(() => {
    fetch(`https://to-do-back-a6f40cecf847.herokuapp.com/api/get_task_status.php?id=${taskId}`, {
      credentials: 'include', // Ensure cookies are sent with the request
    })
      .then((response) => response.json())
      .then((data) => {
        setDone(data.is_completed);
      })
      .catch((error) => console.error('Error fetching task status:', error));
  }, [taskId]);

  // Handle switch toggle
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDoneStatus = event.target.checked ? 1 : 0;

    // Update state locally
    setDone(event.target.checked);

    // Send the updated status to the back-end
    fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/set_task_is_done.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include', // Ensure cookies are sent with the request
      body: new URLSearchParams({
        id: taskId.toString(),
        done: newDoneStatus.toString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error('Error updating task status:', data.error);
        }
      })
      .catch((error) => console.error('Error updating task status:', error));
  };

  return (
    <FormControlLabel
      control={<TaskDoneSwitch checked={done} onChange={handleChange} />}
      label="Done"
    />
  );
}
