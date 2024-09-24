import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

export default function AddTaskButton() {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Tooltip title="Add task" arrow>
        <IconButton aria-label="add_task" size="large">
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}