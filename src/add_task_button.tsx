import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function AddTaskButton() {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleAddTaskClick = () => {
    navigate('/new_task'); // Navigate to the new task page
  };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Tooltip title="Add task" arrow>
        <IconButton aria-label="add_task" size="large" onClick={handleAddTaskClick}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
